/* ==========================================================================
  Componente CartForm.jsx
  Descripción: Vista del carrito de compras migrada a React Bootstrap.
    Muestra los productos agregados, desglose de cantidades y subtotales,
    estado de carrito vacío y opciones de vaciado/continuación de compra.
  Autor: Silvio Jorda
  Fecha: 2026-09-30
========================================================================== */

/* ==========================================================================
  Componente CartPage.jsx
  Descripción: Vista del carrito de compras desacoplada mediante useCartPage,
    con ajuste parcial de cantidades y eliminación completa por ítem.
  Autor: Silvio Jorda
  Fecha: 2026-11-16
========================================================================== */

/* ==========================================================================
  Componente CartPage.jsx
  Descripción: Vista del carrito de compras desacoplada mediante useCartPage,
    con ajuste parcial de cantidades, totales y acciones de cierre de compra.
  Autor: Silvio Jorda
  Fecha: 2026-11-16
========================================================================== */

/* ==========================================================================
  Componente CartPage.jsx
  Descripción: Vista del carrito de compras desacoplada mediante useCartPage,
    con ajuste parcial de cantidades, totales y reutilización de MessageBtnAccept.
  Autor: Silvio Jorda
  Fecha: 2026-11-16
========================================================================== */

// Importaciones
import { Link } from 'react-router-dom';
import { Container, Card, Button, InputGroup } from 'react-bootstrap';
import { useCartPage } from './useCartPage';
import { CartIcon } from '../../components/UI/Icons/CartIcon/CartIcon';
import { MessageBtnAccept } from '../Modal/MessageBtnAccept/MessageBtnAccept';


// Estilos
import styles from './CartPage.module.css';
import '../../styles/Buttons/ActionButtons.css';

export function CartPage() {
  const {
    cart,
    isEmpty,
    totalPrice,
    isCheckoutModalOpen,
    handleIncreaseOne,
    handleDecreaseOne,
    handleRemoveItem,
    clearCart,
    handleCheckout,
    handleCloseCheckoutModal
  } = useCartPage();

  // Estado del Carrito Vacío[cite: 10]
  if (isEmpty && !isCheckoutModalOpen) {
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

  return (
    <>
      <Container className="py-5">
        <Card className={`border-0 p-4 shadow-lg ${styles.mainCard}`}>
          <Card.Body>
            <h1 className={styles.title}>Carrito de Compras</h1>

            {/* Listado de Productos[cite: 10] */}
            <div className="d-flex flex-column gap-3 my-4">
              {cart.map((item) => {
                const maxStock = item.stock ?? Infinity;

                return (
                  <Card key={item.id} className={`border-0 p-3 ${styles.itemCard}`}>
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                      {/* Foto e Información del Producto[cite: 10] */}
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

                      {/*}
                      <div className="d-flex align-items-center flex-wrap gap-3">
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

                        <strong className={styles.itemSubtotal}>
                          ${(item.price * item.quantity).toLocaleString('es-AR')}
                        </strong>

                        <Button
                          variant="link"
                          className={styles.removeButton}
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                      */}

                      {/* Controles de Cantidad, Subtotal y Eliminación */}
<div className="d-flex align-items-center flex-wrap gap-3">
  <InputGroup size="sm" style={{ width: '115px' }}>
    <Button
      className={styles.qtyBtn}
      onClick={() => handleDecreaseOne(item.id)}
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

  <strong className={styles.itemSubtotal}>
    ${(item.price * item.quantity).toLocaleString('es-AR')}
  </strong>

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

            {/* 1. Primer Divisor + Total de la Suma */}
            <div className={`pt-3 mb-4 d-flex justify-content-end ${styles.sectionDivider}`}>
              <div className={styles.totalText}>
                Total: <span className={styles.totalAmount}>${totalPrice.toLocaleString('es-AR')}</span>
              </div>
            </div>

            {/* 2. Fila de Botones Secundarios (Izquierda / Derecha con mismo tamaño) */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 pb-4">
              <Button
                as={Link}
                to="/products"
                className={`detailsBtn ${styles.equalActionBtn} ${styles.continueButton}`}
              >
                Seguir Comprando
              </Button>

              <Button
                type="button"
                className={`${styles.equalActionBtn} ${styles.clearButton}`}
                onClick={clearCart}
              >
                Vaciar Carrito
              </Button>
            </div>

            {/* 3. Segundo Divisor + Botón Principal Centrado */}
            <div className={`pt-4 d-flex justify-content-center ${styles.sectionDivider}`}>
              <Button
                type="button"
                className={`addBtn ${styles.checkoutButton}`}
                onClick={handleCheckout}
              >
                Finalizar la Compra
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>

      {/* Modal de Confirmación */}
      <MessageBtnAccept
        isOpen={isCheckoutModalOpen}
        onClose={handleCloseCheckoutModal}
        title="¡ Operación Exitosa !"
        message=" Compra finalizada correctamente. "
      />
    </>
  );
}