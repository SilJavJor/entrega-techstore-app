/* ==========================================================================
  Componente CartSummaryOffcanvas.jsx
  Descripción: Panel lateral desplegable (Offcanvas) que muestra el resumen
    del carrito y confirma la adición de productos al deslizar desde la derecha.
  Autor: Silvio Jorda
  Fecha: 2026-11-05
========================================================================== */

import { Offcanvas, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './CartSummary.module.css';

export function CartSummary({
  isOpen,
  onClose,
  lastAddedProduct,
  cart = [],
  totalItems = 0,
  totalPrice = 0
}) {
  return (
    <Offcanvas
      show={isOpen}
      onHide={onClose}
      placement="end"
      className={styles.offcanvasWrapper}
    >
      <Offcanvas.Header closeButton className={styles.header}>
        <Offcanvas.Title className={styles.title}>
          Tu Carrito de Compras
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className={`d-flex flex-column justify-content-between ${styles.body}`}>
        <div>
          {/* Alerta del producto recién agregado */}
          {lastAddedProduct && (
            <div className={`p-3 mb-4 ${styles.addedAlert}`}>
              <span className={styles.addedNotice}>✓ Producto agregado recientemente</span>
              <div className="d-flex align-items-center gap-3 mt-2">
                <img
                  src={lastAddedProduct.image || lastAddedProduct.imagen || 'https://via.placeholder.com/60'}
                  alt={lastAddedProduct.name || lastAddedProduct.nombre}
                  className={styles.addedImage}
                />
                <div>
                  <h6 className={`mb-1 ${styles.productName}`}>
                    {lastAddedProduct.name || lastAddedProduct.nombre}
                  </h6>
                  <div className="d-flex align-items-center gap-2">
                    <span className={styles.productPrice}>
                      $ {Number(lastAddedProduct.price || lastAddedProduct.precio || 0).toLocaleString('es-AR')}
                    </span>
                    <span className={styles.productQty}>
                      (x{lastAddedProduct.addedQuantity || 1})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Listado rápido de ítems guardados en el carrito */}
          <h6 className={`mb-3 ${styles.sectionSubtitle}`}>
            Contenido actual ({totalItems} {totalItems === 1 ? 'ítem' : 'ítems'}):
          </h6>

          <div className={`d-flex flex-column gap-2 ${styles.itemsList}`}>
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className={`d-flex justify-content-between align-items-center p-2 ${styles.itemRow}`}>
                  <div className="d-flex align-items-center gap-2 overflow-hidden">
                    <Badge bg="dark" className={styles.qtyBadge}>
                      {item.quantity || 1}x
                    </Badge>
                    <span className={`text-truncate ${styles.itemName}`}>
                      {item.name || item.nombre}
                    </span>
                  </div>
                  <span className={styles.itemSubtotal}>
                    $ {Number((item.price || item.precio || 0) * (item.quantity || 1)).toLocaleString('es-AR')}
                  </span>
                </div>
              ))
            ) : (
              <p className={styles.emptyText}>El carrito está vacío.</p>
            )}
          </div>
        </div>

        {/* Resumen Final y Acciones */}
        <div className={`pt-3 border-top ${styles.footerBox}`}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className={styles.totalLabel}>Monto Total:</span>
            <span className={styles.totalAmount}>
              $ {Number(totalPrice).toLocaleString('es-AR')}
            </span>
          </div>

          <div className="d-flex flex-column gap-2">
            <Button
              as={Link}
              to="/cart"
              onClick={onClose}
              className={styles.goToCartBtn}
            >
              Ver y Finalizar Compra
            </Button>

            <Button
              variant="outline-light"
              as={Link}
              to="/products"
              onClick={onClose}
              className={styles.continueBtn}
            >
              Seguir Comprando
            </Button>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}