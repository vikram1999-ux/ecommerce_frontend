import { Link } from "react-router-dom";
import { FaTrash } from "../components/Icons";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type CartItemProps = {
    cartItem: CartItem; // Specific type for cartItem
    incrementHandler: (cartItem: CartItem) => void;
    decrementHandler: (cartItem: CartItem) => void;
    removeHandler: (id: string) => void;
};

const CartItemComponent = ({ cartItem, incrementHandler, decrementHandler, removeHandler }: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;
  
  return (
    <div className="cart-item">
        <img src={`${server}/${photo}`} alt={name} />
        <article>
            <Link to={`/product/${productId}`}>{name}</Link>
            <span>₹{price}</span>
        </article>
        <div>
            <button 
                onClick={() => decrementHandler(cartItem)} 
                aria-label={`Decrease quantity of ${name}`} // Added accessibility
            >
                -
            </button>
            <p>{quantity}</p>
            <button 
                onClick={() => incrementHandler(cartItem)} 
                aria-label={`Increase quantity of ${name}`} // Added accessibility
            >
                +
            </button>
        </div>
        <button 
            onClick={() => removeHandler(productId)} 
            aria-label={`Remove ${name} from cart`} // Added accessibility
        >
            <FaTrash />
        </button>
    </div>
  );
};

export default CartItemComponent;
