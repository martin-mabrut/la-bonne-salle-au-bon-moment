import { describe, it, expect } from 'vitest'
import RoomCard from '../src/composants/RoomCard'
import { renderToString } from 'react-dom/server';

describe('RoomCard', () => {
  it('affiche le nom et la capacité de la salle', () => {
    const salle = { id: 'Wx2Pb4iW4p8', name: 'oskour', capacity: 1}
    const salleEnFront = renderToString(<RoomCard salle={salle} />)
    expect(salleEnFront).toContain('oskour')
    expect(salleEnFront).toContain('1')
  })
})