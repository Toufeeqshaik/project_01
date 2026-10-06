import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HealthDashboard from './HealthDashboard';

describe('HealthDashboard Component', () => {
  it('renders loading state initially', () => {
    const { container } = render(<HealthDashboard />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument(); 
  });

  it('renders dashboard with patient data eventually', async () => {
    render(<HealthDashboard />);
    // wait for loading state to finish
    await waitFor(() => {
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    });
    // check metric elements
    expect(screen.getByText('120/80')).toBeInTheDocument();
    expect(screen.getByText('98')).toBeInTheDocument();
  });
});
