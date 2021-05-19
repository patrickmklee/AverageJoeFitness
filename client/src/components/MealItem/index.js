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
            fdcId: item.fdcId,
            quantity: parseInt(value)
          });

          idbPromise('meal', 'put', { ...item, quantity: parseInt(value)})
        }
      };


  return (
    <div className="flex-row">
      <div>
        {/* {item. */}
      </div>
      <div>
        <div>{item.displayName}, {item.calories}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.quantity}
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