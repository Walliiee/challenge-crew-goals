import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound'

test('renders 404 page with link home', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  )
  expect(screen.getByText(/404/)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument()
})
