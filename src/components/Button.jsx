import { ArrowRight } from 'lucide-react';

/**
 * Botón con círculo intercambiable.
 *
 * Anatomía tomada de la referencia: un círculo de 34 px pegado al borde
 * izquierdo y el texto separado a la derecha. Dentro del círculo hay DOS
 * copias del icono apiladas; al pasar el cursor la primera se encoge a escala
 * 0 y la segunda crece. El intercambio es puro CSS (ver index.css): es una
 * microinteracción de hover, y no merece un tween por cada entrada del ratón.
 */
const Button = ({
  as = 'a',
  variant = 'glass',
  icon: Icon = ArrowRight,
  children,
  className = '',
  ...props
}) => {
  const Tag = as;
  const variantClass =
    variant === 'accent' ? ' btn--accent' : variant === 'bare' ? ' btn--bare' : '';

  if (variant === 'bare') {
    return (
      <Tag className={`btn btn--bare ${className}`} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag className={`btn${variantClass} ${className}`} {...props}>
      <span className="btn-icon" aria-hidden="true">
        <span>
          <Icon size={13} strokeWidth={2.2} />
        </span>
        <span>
          <Icon size={13} strokeWidth={2.2} />
        </span>
      </span>
      {children}
    </Tag>
  );
};

export default Button;
