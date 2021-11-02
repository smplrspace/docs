/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import RoomAvailability from './RoomAvailability'

import RoomAvailabilityCode from '!!raw-loader!./RoomAvailability'
import ViewerCode from '!!raw-loader!./Viewer'

export const roomAvailability = {
  slug: 'room-availability',
  title: 'Room availability',
  description:
    'Demonstrate how to create and display rooms with a polygon data layer.',
  published: true,
  code: [
    {
      filename: 'RoomAvailability.js',
      lang: 'jsx',
      content: RoomAvailabilityCode
    },
    { filename: 'Viewer.js', lang: 'jsx', content: ViewerCode }
  ]
}

export default function () {
  return (
    <Project project={roomAvailability}>
      <RoomAvailability />
    </Project>
  )
}
