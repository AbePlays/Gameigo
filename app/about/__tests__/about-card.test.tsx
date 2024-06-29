import { describe, expect, it } from 'vitest'

import { mockHeading, mockTitle } from 'test/mockData'
import { render, screen } from 'test/test-utils'
import { AboutCard } from '../about-card'

describe('Testing AboutCard Component', () => {
  it('should check heading', () => {
    render(<AboutCard heading={mockHeading} />)
    expect(screen.getByText(mockHeading)).toBeInTheDocument()
  })

  it('should check children element', () => {
    render(
      <AboutCard heading={mockHeading}>
        <a href="#">{mockTitle}</a>
      </AboutCard>
    )
    expect(screen.getByRole('link')).toHaveTextContent(mockTitle)
  })
})
