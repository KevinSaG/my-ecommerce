/**
 * Unit Tests - AuthHandler Component
 */

import { render, waitFor } from '@testing-library/react'
import AuthHandler from '@/app/auth-handler'

const mockReplace = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  useSearchParams: jest.fn(),
}))

describe('AuthHandler Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should redirect to callback when OAuth code is present', async () => {
    const { useSearchParams } = require('next/navigation')
    const mockSearchParams = new URLSearchParams('code=abc123')
    useSearchParams.mockReturnValue(mockSearchParams)

    render(<AuthHandler />)

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/auth/callback?code=abc123')
    })
  })

  it('should redirect to signin when OAuth error is present', async () => {
    const { useSearchParams } = require('next/navigation')
    const mockSearchParams = new URLSearchParams('error=access_denied&error_description=User cancelled')
    useSearchParams.mockReturnValue(mockSearchParams)

    render(<AuthHandler />)

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining('/signin?error='))
    })
  })

  it('should not redirect when no code or error is present', () => {
    const { useSearchParams } = require('next/navigation')
    const mockSearchParams = new URLSearchParams('')
    useSearchParams.mockReturnValue(mockSearchParams)

    const { container } = render(<AuthHandler />)

    expect(mockReplace).not.toHaveBeenCalled()
    expect(container.firstChild).toBeNull()
  })

  it('should show loading state when code is present', () => {
    const { useSearchParams } = require('next/navigation')
    const mockSearchParams = new URLSearchParams('code=abc123')
    useSearchParams.mockReturnValue(mockSearchParams)

    const { getByText } = render(<AuthHandler />)

    expect(getByText(/Completando autenticación/i)).toBeInTheDocument()
  })
})

