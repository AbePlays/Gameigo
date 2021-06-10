import { BrandButton } from '@/components/Buttons';
import { render, screen } from '../../test-utils';

const imgSrc = '/';
const title = 'title';
const renderButton = () => {
  return render(<BrandButton imgSrc={imgSrc} title={title} />);
};

describe('Testing BrandButton Component', () => {
  it('should check image src inside the button', () => {
    renderButton();
    const imageEl = screen.getByRole('img', { name: /brand logo/i });
    expect(imageEl).toBeInTheDocument();
  });

  it('should check title inside the button', () => {
    renderButton();
    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveTextContent(title);
  });
});
