"use client"

import { decrement, increment } from "@/redux/features/counterSlice";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
    const count = useSelector((state => state.counter.value))
    const dispatch = useDispatch();

    return (
        <div>
            <h3>counter {count}</h3>
            <button className="btn btn-primary me-2" onClick={() => dispatch(increment())}>Increment</button>
            <button className="btn btn-secondary" onClick={() => dispatch(decrement())}>Decremment</button>
        </div>
    );
};

export default Counter;