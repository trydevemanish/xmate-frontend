import React from 'react'
import { useParams } from 'react-router'

export default function Challenge() {
    let params = useParams()
    let gameid = params.gameid
  return (
    <div>
      this page is dedicated for the Challenge part. {gameid}
    </div>
  )
}
