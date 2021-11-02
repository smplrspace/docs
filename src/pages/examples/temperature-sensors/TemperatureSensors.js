import React, { useState, useCallback, useReducer, useEffect } from 'react'
import { Group, Chips, Chip, List, ListItem } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import numeral from 'numeral'
import Chance from 'chance'
import chroma from 'chroma-js'

import Viewer from './Viewer'

const chance = new Chance()

const TemperatureSensors = () => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  const [space, setSpace] = useState()
  const [mode, setMode] = useState('pick')

  const [sensors, dispatchSensor] = useReducer((sensors, action) => {
    switch (action.type) {
      case 'add':
        return [...sensors, action.sensor]
      default:
        console.error(`Unknown action type ${action.type}`)
    }
  }, [])

  // memoize so Viewer render once only (wrapped in memo)
  const onReady = useCallback(space => setSpace(space), [])

  // sensor placement
  useEffect(() => {
    if (!space) {
      return
    }
    if (mode === 'pick') {
      space.enablePickingMode({
        onPick: ({ coordinates }) => {
          dispatchSensor({
            type: 'add',
            sensor: {
              name:
                chance.letter({ casing: 'upper' }) +
                chance.integer({ min: 1, max: 9 }),
              temp: Math.random() * 28,
              position: coordinates
            }
          })
        }
      })
    } else {
      space.disablePickingMode()
    }
  }, [space, mode])

  // render sensors
  useEffect(() => {
    if (!space) {
      return
    }
    if (mode === 'pick') {
      space.addDataLayer({
        id: 'sensors',
        type: 'point',
        diameter: 0.5,
        anchor: 'bottom',
        data: sensors,
        tooltip: d => d.name
      })
    } else {
      const temperatureScale = chroma.scale('RdYlBu').domain([28, 0])
      space.addDataLayer({
        id: 'sensors',
        type: 'point',
        diameter: 0.8,
        anchor: 'bottom',
        data: sensors,
        tooltip: d => `${d.name} - ${numeral(d.temp).format('0.0')}°C`,
        color: d => temperatureScale(d.temp).hex()
      })
    }
    return () => {
      space.removeDataLayer('sensors')
    }
  }, [space, mode, sensors])

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
          <Chips
            color='blue'
            variant='outline'
            radius='sm'
            value={mode}
            onChange={setMode}
          >
            <Chip value='pick'>Drop new sensor</Chip>
            <Chip value='display'>Display sensors data</Chip>
          </Chips>
          {mode === 'pick' ? (
            <p>Click on the floor plan to position a new sensor.</p>
          ) : (
            <p>
              Sensor data is rendered on the floor plan using a point data
              layer.
            </p>
          )}
          <h3>Sensors</h3>
          {sensors.length === 0 && <p>No sensor yet.</p>}
          <List>
            {sensors.map((sensor, index) => (
              <ListItem key={index}>
                {sensor.name} - (L{sensor.position.levelIndex},{' '}
                {numeral(sensor.position.x).format('0.0')}m,{' '}
                {numeral(sensor.position.z).format('0.0')}m ,{' '}
                {numeral(sensor.position.elevation).format('0.0')}m) -{' '}
                {numeral(sensor.temp).format('0.0')}°C
              </ListItem>
            ))}
          </List>
        </Group>
      )}
    </Group>
  )
}

export default TemperatureSensors
