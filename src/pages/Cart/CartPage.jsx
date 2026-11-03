/* ==========================================================================
  Componente CartForm.jsx
  Descripción: Vista del carrito de compras migrada a React Bootstrap.
    Muestra los productos agregados, desglose de cantidades y subtotales,
    estado de carrito vacío y opciones de vaciado/continuación de compra.
  Autor: Silvio Jorda
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { useCart } from '../../context/Cart/CartContext';
import { CartIcon } from '../../components/UI/Icons/CartIcon/CartIcon';
import styles from './CartPage.module.css';

export function CartForm() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();

  // Estado del Carrito Vacío
  if (cart.length === 0) {
    return (
      <Container className="py-5 d-flex justify-content-center align-items-center">
        <Card className={`border-0 p-4 text-center shadow-lg ${styles.emptyCard}`}>
          <Card.Body className="d-flex flex-column align-items-center">
            {/* <h2 className={styles.emptyTitle}>Tu carrito está vacío 🛒</h2> */}
            <h2 className={styles.emptyTitle}>Tu carrito está vacío <CartIcon /></h2>

            <p className={styles.emptySubtitle}>
              ¿ No sabés qué comprar ? ¡ Revisá nuestro catálogo !
            </p>

            <Button
              as={Link}
              to="/products"
              className={styles.continueButton}
            >
              Ver Productos
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // Estado con Productos en el Carrito
  return (
    <Container className="py-5">
      <Card className={`border-0 p-4 shadow-lg ${styles.mainCard}`}>
        <Card.Body>
          <h1 className={styles.title}>Carrito de Compras</h1>

          {/* Listado de Productos */}
          <div className="d-flex flex-column gap-3 my-4">
            {cart.map((item) => (
              <Card key={item.id} className={`border-0 p-3 ${styles.itemCard}`}>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  {/* Foto e Información del Producto */}
                  <div className="d-flex align-items-center gap-3">
                    <div className={styles.imageWrapper}>
                      <img src={item.image} alt={item.name} className={styles.itemImage} />
                    </div>

                    <div>
                      <h4 className={styles.itemName}>{item.name}</h4>

                      <span className={styles.itemDetails}>
                        ${item.price.toLocaleString()} x {item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'}
                      </span>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="d-flex align-items-center gap-4">
                    <strong className={styles.itemSubtotal}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </strong>

                    {/* Botón Eliminar */}
                    <Button
                      variant="link"
                      className={styles.removeButton}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Panel de Resumen */}
          <div className={`d-flex justify-content-between align-items-center flex-wrap gap-3 pt-3 ${styles.footer}`}>
            <div className="d-flex gap-3 flex-wrap">
              {/* Seguir Comprando */}
              <Button as={Link} to="/products" className={styles.continueButton}>
                Seguir Comprando
              </Button>

              {/* Vaciar el Carrito */}
              <Button className={styles.clearButton} onClick={clearCart}>
                Vaciar Carrito
              </Button>
            </div>

            <div className={styles.totalText}>
              Total: <span className={styles.totalAmount}>${totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}