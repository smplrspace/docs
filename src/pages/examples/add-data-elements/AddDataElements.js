import React, {
  useState,
  useCallback,
  useReducer,
  useEffect,
  Fragment
} from 'react'
import { Group, UnstyledButton } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Chance from 'chance'
import { append, compose, isEmpty, map, reject, intersperse } from 'ramda'

import Viewer from './Viewer'

const chance = new Chance()

const AddDataElements = () => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  const [space, setSpace] = useState()
  const [mode, setMode] = useState('idle')
  const [editingId, setEditingId] = useState()

  const [points, dispatchPoint] = useReducer((points, action) => {
    switch (action.type) {
      case 'add':
        return [...points, action.point]
      case 'update':
        return points.map(pt =>
          pt.id === action.id ? { ...pt, ...action.updates } : pt
        )
      case 'remove':
        return reject(r => r.id === action.id)(points)
      default:
        console.error(`Unknown action type ${action.type}`)
    }
  }, [])

  const [icons, dispatchIcon] = useReducer((icons, action) => {
    switch (action.type) {
      case 'add':
        return [...icons, action.icon]
      case 'update':
        return icons.map(pt =>
          pt.id === action.id ? { ...pt, ...action.updates } : pt
        )
      case 'remove':
        return reject(r => r.id === action.id)(icons)
      default:
        console.error(`Unknown action type ${action.type}`)
    }
  }, [])

  const [polygons, dispatchPolygon] = useReducer((polygons, action) => {
    switch (action.type) {
      case 'addPolygon':
        return append(
          {
            id: action.id,
            name:
              chance.letter({ casing: 'upper' }) +
              chance.integer({ min: 1, max: 9 }),
            coordinates: []
          },
          polygons
        )
      case 'addCoordinate':
        return polygons.map(r =>
          r.id === action.id
            ? { ...r, coordinates: [...r.coordinates, action.coordinate] }
            : r
        )
      case 'updateCoordinates':
        return polygons.map(r =>
          r.id === action.id ? { ...r, coordinates: action.coordinates } : r
        )
      case 'removePolygon':
        return reject(r => r.id === action.id)(polygons)
      default:
        console.error(`Unknown action type ${action.type}`)
    }
  }, [])

  const [polylines, dispatchPolyline] = useReducer((polylines, action) => {
    switch (action.type) {
      case 'addPolyline':
        return append(
          {
            id: action.id,
            name:
              chance.letter({ casing: 'upper' }) +
              chance.integer({ min: 1, max: 9 }),
            coordinates: []
          },
          polylines
        )
      case 'addCoordinate':
        return polylines.map(r =>
          r.id === action.id
            ? { ...r, coordinates: [...r.coordinates, action.coordinate] }
            : r
        )
      case 'updateCoordinates':
        return polylines.map(r =>
          r.id === action.id ? { ...r, coordinates: action.coordinates } : r
        )
      case 'removePolyline':
        return reject(r => r.id === action.id)(polylines)
      default:
        console.error(`Unknown action type ${action.type}`)
    }
  }, [])

  // memoize so Viewer render once only (wrapped in memo)
  const onReady = useCallback(space => setSpace(space), [])

  // switch picking mode
  useEffect(() => {
    if (!space) {
      return
    }
    if (mode === 'drawPoint') {
      space.enablePickingMode({
        onPick: ({ coordinates }) => {
          dispatchPoint({
            type: 'add',
            point: {
              id: chance.guid(),
              name:
                chance.letter({ casing: 'upper' }) +
                chance.integer({ min: 1, max: 9 }),
              position: coordinates
            }
          })
        }
      })
    } else if (mode === 'drawIcon') {
      space.enablePickingMode({
        onPick: ({ coordinates }) => {
          dispatchIcon({
            type: 'add',
            icon: {
              id: chance.guid(),
              name:
                chance.letter({ casing: 'upper' }) +
                chance.integer({ min: 1, max: 9 }),
              position: coordinates
            }
          })
        }
      })
    } else if (mode === 'drawPolygon') {
      space.enablePickingMode({
        onPick: ({ coordinates }) => {
          dispatchPolygon({
            type: 'addCoordinate',
            id: editingId,
            coordinate: coordinates
          })
        }
      })
    } else if (mode === 'drawPolyline') {
      space.enablePickingMode({
        onPick: ({ coordinates }) => {
          dispatchPolyline({
            type: 'addCoordinate',
            id: editingId,
            coordinate: coordinates
          })
        }
      })
    } else {
      space.disablePickingMode()
    }
  }, [space, editingId, mode])

  // render elements
  useEffect(() => {
    if (!space) {
      return
    }
    space.addDataLayer({
      id: 'points',
      type: 'point',
      data: points,
      diameter: 0.5,
      anchor: 'bottom',
      tooltip: d => d.name,
      onDrop: ({ data, position }) =>
        dispatchPoint({
          type: 'update',
          id: data.id,
          updates: { position }
        })
    })
  }, [space, points])

  useEffect(() => {
    if (!space) {
      return
    }
    space.addDataLayer({
      id: 'icons',
      type: 'icon',
      data: icons,
      icon: {
        url: '/img/logo.png',
        width: 180,
        height: 180
      },
      width: 0.5,
      tooltip: d => d.name,
      onDrop: ({ data, position }) =>
        dispatchIcon({
          type: 'update',
          id: data.id,
          updates: { position }
        })
    })
  }, [space, icons])

  useEffect(() => {
    if (!space) {
      return
    }
    space.addDataLayer({
      id: 'polygons',
      type: 'polygon',
      data: reject(p => isEmpty(p.coordinates))(polygons),
      height: 3.05,
      alpha: 0.5,
      tooltip: d => d.name,
      onDrop: ({ data, coordinates }) =>
        dispatchPolygon({
          type: 'updateCoordinates',
          id: data.id,
          coordinates
        })
    })
  }, [space, polygons])

  useEffect(() => {
    if (!space) {
      return
    }
    space.addDataLayer({
      id: 'polylines',
      type: 'polyline',
      data: reject(p => isEmpty(p.coordinates))(polylines),
      scale: 0.2,
      tooltip: d => d.name,
      onDrop: ({ data, coordinates }) =>
        dispatchPolyline({
          type: 'updateCoordinates',
          id: data.id,
          coordinates
        })
    })
  }, [space, polylines])

  return (
    <Group align='flex-start'>
      <div style={{ width: isMobile ? '100%' : 'calc(50% - 16px)' }}>
        <Viewer onReady={onReady} />
      </div>
      {!space ? (
        <p>Please start the viewer</p>
      ) : (
        <Group
          direction='column'
          style={{ width: isMobile ? '100%' : 'calc(50% - 16px)' }}
        >
          <p>👉 Click "Add" and draw elements on the floor plan</p>

          <h4>Points</h4>
          <span style={{ marginTop: 0 }}>
            {compose(
              intersperse(' - '),
              map(p => (
                <Fragment key={p.id}>
                  {p.name}{' '}
                  <UnstyledButton
                    style={{ textDecoration: 'underline' }}
                    onClick={() => dispatchPoint({ type: 'remove', id: p.id })}
                  >
                    [x]
                  </UnstyledButton>
                </Fragment>
              ))
            )(points)}
            {' - '}
            {mode !== 'drawPoint' ? (
              <UnstyledButton
                style={{ textDecoration: 'underline' }}
                onClick={() => {
                  setMode('drawPoint')
                }}
              >
                [Add]
              </UnstyledButton>
            ) : (
              <UnstyledButton
                style={{ textDecoration: 'underline' }}
                onClick={() => {
                  setMode('idle')
                }}
              >
                [Done]
              </UnstyledButton>
            )}
          </span>

          <h4>Icons</h4>
          <span style={{ marginTop: 0 }}>
            {compose(
              intersperse(' - '),
              map(p => (
                <Fragment key={p.id}>
                  {p.name}{' '}
                  <UnstyledButton
                    style={{ textDecoration: 'underline' }}
                    onClick={() => dispatchIcon({ type: 'remove', id: p.id })}
                  >
                    [x]
                  </UnstyledButton>
                </Fragment>
              ))
            )(icons)}
            {' - '}
            {mode !== 'drawIcon' ? (
              <UnstyledButton
                style={{ textDecoration: 'underline' }}
                onClick={() => {
                  setMode('drawIcon')
                }}
              >
                [Add]
              </UnstyledButton>
            ) : (
              <UnstyledButton
                style={{ textDecoration: 'underline' }}
                onClick={() => {
                  setMode('idle')
                }}
              >
                [Done]
              </UnstyledButton>
            )}
          </span>

          <h4>Polygons</h4>
          <span style={{ marginTop: 0 }}>
            {compose(
              intersperse(' - '),
              map(p => (
                <Fragment key={p.id}>
                  {p.name}{' '}
                  <UnstyledButton
                    style={{ textDecoration: 'underline' }}
                    onClick={() =>
                      dispatchPolygon({ type: 'removePolygon', id: p.id })
                    }
                  >
                    [x]
                  </UnstyledButton>
                </Fragment>
              ))
            )(polygons)}
            {' - '}
            <UnstyledButton
              style={{ textDecoration: 'underline' }}
              onClick={() => {
                const id = chance.guid()
                dispatchPolygon({ type: 'addPolygon', id })
                setEditingId(id)
                setMode('drawPolygon')
              }}
            >
              [Add]
            </UnstyledButton>
            {mode === 'drawPolygon' && (
              <Fragment>
                {' '}
                <UnstyledButton
                  style={{ textDecoration: 'underline' }}
                  onClick={() => {
                    setEditingId()
                    setMode('idle')
                  }}
                >
                  [Done]
                </UnstyledButton>
              </Fragment>
            )}
          </span>

          <h4>Polylines</h4>
          <span style={{ marginTop: 0 }}>
            {compose(
              intersperse(' - '),
              map(p => (
                <Fragment key={p.id}>
                  {p.name}{' '}
                  <UnstyledButton
                    style={{ textDecoration: 'underline' }}
                    onClick={() =>
                      dispatchPolyline({ type: 'removePolyline', id: p.id })
                    }
                  >
                    [x]
                  </UnstyledButton>
                </Fragment>
              ))
            )(polylines)}
            {' - '}
            <UnstyledButton
              style={{ textDecoration: 'underline' }}
              onClick={() => {
                const id = chance.guid()
                dispatchPolyline({ type: 'addPolyline', id })
                setEditingId(id)
                setMode('drawPolyline')
              }}
            >
              [Add]
            </UnstyledButton>
            {mode === 'drawPolyline' && (
              <Fragment>
                {' '}
                <UnstyledButton
                  style={{ textDecoration: 'underline' }}
                  onClick={() => {
                    setEditingId()
                    setMode('idle')
                  }}
                >
                  [Done]
                </UnstyledButton>
              </Fragment>
            )}
          </span>
        </Group>
      )}
    </Group>
  )
}

export default AddDataElements
