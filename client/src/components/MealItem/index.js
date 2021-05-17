import React from 'react';
import { useScheduleContext } from '../../utils/GlobalState';
import { REMOVE_FROM_MEAL, UPDATE_MEAL_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

const MealItem = ({ item }) => {

    const [, dispatch] = useScheduleContext();

    const removeFromMeal = item => {
        dispatch({
          type: REMOVE_FROM_MEAL,
          _id: item._id
        });
        idbPromise('meal', 'delete', { ...item });
      };


    const onChange = (e) => {
        const value = e.target.value;
      
        if (value === '0') {
          dispatch({
            type: REMOVE_FROM_MEAL,
            _id: item._id
          });

          idbPromise('meal', 'delete', {...item})
        } else {
          dispatch({
            type: UPDATE_MEAL_QUANTITY,
            _id: item._id,
            purchaseQuantity: parseInt(value)
          });

          idbPromise('meal', 'put', { ...item, purchaseQuantity: parseInt(value)})
        }
      };


  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
            <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromMeal(item)}
            >
            🗑️
            </span>
        </div>
      </div>
    </div>
  );
}

export default MealItem;