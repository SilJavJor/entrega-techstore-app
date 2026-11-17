/* ==========================================================================
  Componente CartForm.jsx
  Descripción: Vista del carrito de compras migrada a React Bootstrap.
    Muestra los productos agregados, desglose de cantidades y subtotales,
    estado de carrito vacío y opciones de vaciado/continuación de compra.
  Autor: Silvio Jorda
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
/* ==========================================================================
  Componente CartPage.jsx
  Descripción: Vista del carrito de compras desacoplada mediante useCartPage,
    con ajuste parcial de cantidades y eliminación completa por ítem.
  Autor: Silvio Jorda
  Fecha: 2026-11-16
========================================================================== */

import { Link } from 'react-router-dom';
import { Container, Card, Button, InputGroup } from 'react-bootstrap';
import { useCartPage } from './useCartPage';
import { CartIcon } from '../../components/UI/Icons/CartIcon/CartIcon';

import styles from './CartPage.module.css';

export function CartPage() {
  const {
    cart,
    isEmpty,
    totalPrice,
    handleIncreaseOne,
    handleDecreaseBy,
    handleRemoveItem,
    clearCart
  } = useCartPage();

  // Estado del Carrito Vacío
  if (isEmpty) {
    return (
      <Container className="py-5 d-flex justify-content-center align-items-center">
        <Card className={`border-0 p-4 text-center shadow-lg ${styles.emptyCard}`}>
          <Card.Body className="d-flex flex-column align-items-center">
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
            {cart.map((item) => {
              const maxStock = item.stock ?? Infinity;

              return (
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
                          ${item.price.toLocaleString('es-AR')} x {item.quantity}{' '}
                          {item.quantity === 1 ? 'unidad' : 'unidades'}
                        </span>
                      </div>
                    </div>

                    {/* Controles de Cantidad, Subtotal y Eliminación */}
                    <div className="d-flex align-items-center flex-wrap gap-3">
                      {/* Selector - / Cantidad / + */}
                      <InputGroup size="sm" style={{ width: '115px' }}>
                        <Button
                          className={styles.qtyBtn}
                          onClick={() => handleDecreaseBy(item.id, 1)}
                          title="Quitar 1 unidad"
                        >
                          -
                        </Button>

                        <span className={`form-control text-center ${styles.qtyDisplay}`}>
                          {item.quantity}
                        </span>

                        <Button
                          className={styles.qtyBtn}
                          onClick={() => handleIncreaseOne(item)}
                          disabled={item.quantity >= maxStock}
                          title="Agregar 1 unidad"
                        >
                          +
                        </Button>
                      </InputGroup>

                      {/* Botón rápido para quitar más de 1 unidad si hay varias */}
                      {item.quantity > 2 && (
                        <Button
                          type="button"
                          size="sm"
                          className={styles.decreaseMultiBtn}
                          onClick={() => handleDecreaseBy(item.id, 2)}
                          title="Quitar 2 unidades de este producto"
                        >
                          -2 unid.
                        </Button>
                      )}

                      {/* Subtotal[cite: 11] */}
                      <strong className={styles.itemSubtotal}>
                        ${(item.price * item.quantity).toLocaleString('es-AR')}
                      </strong>

                      {/* Botón Eliminar Completo[cite: 11] */}
                      <Button
                        variant="link"
                        className={styles.removeButton}
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Panel de Resumen[cite: 11] */}
          <div className={`d-flex justify-content-between align-items-center flex-wrap gap-3 pt-3 ${styles.footer}`}>
            <div className="d-flex gap-3 flex-wrap">
              <Button as={Link} to="/products" className={styles.continueButton}>
                Seguir Comprando
              </Button>

              <Button className={styles.clearButton} onClick={clearCart}>
                Vaciar Carrito
              </Button>
            </div>

            <div className={styles.totalText}>
              Total: <span className={styles.totalAmount}>${totalPrice.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}