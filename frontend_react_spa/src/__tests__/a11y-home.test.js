import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';
import { RoutesPlaceholder } from '../routes/RoutesPlaceholder';

expect.extend(toHaveNoViolations);

describe('Accessibility - Home screen', () => {
  it('has no detectable a11y violations', async () => {
    const { container } = render(<RoutesPlaceholder route="home" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
