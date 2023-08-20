import React from "react";
import { useDispatch } from "react-redux";
import {
  changeGemColor,
  changeRingColor,
  changeRing,
} from "../reduxStore/ringSlice";

import silver from "../assets/silver.webp";
import gold from "../assets/gold.webp";
import ros_gold from "../assets/rosGold1.webp";
import ros_gold2 from "../assets/rosGold2.webp";

import white_gem from "../assets/whiteGem.webp";
import red_gem from "../assets/redGem.webp";
import blue_gem from "../assets/blueGem.webp";
import green_gem from "../assets/greenGem.webp";

import ringImg1 from "../assets/ring02.webp";
import ringImg2 from "../assets/ring03.webp";
import ringImg3 from "../assets/ring04.webp";

const Details = ({ active }) => {
  const dispatch = useDispatch();

  if (active === "gem") {
    return (
      <ul>
        <li>
          <button onClick={() => dispatch(changeGemColor(0xffffff))}>
            <img className="details__image" src={white_gem} />
          </button>
        </li>
        <li>
          <button onClick={() => dispatch(changeGemColor(0xf97575))}>
            <img className="details__image" src={red_gem} />
          </button>
        </li>
        <li>
          <button onClick={() => dispatch(changeGemColor(0x89aff9))}>
            <img className="details__image" src={blue_gem} />
          </button>
        </li>
        <li>
          <button onClick={() => dispatch(changeGemColor(0x94ffa8))}>
            <img className="details__image" src={green_gem} />
          </button>
        </li>
      </ul>
    );
  } else if (active === "body") {
    return (
      <ul>
        <li>
          <button onClick={() => dispatch(changeRingColor([1, 0.843, 0.333]))}>
            <img className="details__image" src={gold} />
          </button>
        </li>
        <li>
          <button onClick={() => dispatch(changeRingColor([1, 1, 1]))}>
            <img className="details__image" src={silver} />
          </button>
        </li>
        <li>
          <button onClick={() => dispatch(changeRingColor([1, 0.6117, 0.839]))}>
            <img className="details__image" src={ros_gold} />
          </button>
        </li>
        <li>
          <button
            onClick={() => dispatch(changeRingColor([0.717, 0.43137, 0.474]))}
          >
            <img className="details__image" src={ros_gold2} />
          </button>
        </li>
      </ul>
    );
  } else if (active === "rings") {
    return (
      <ul>
        <li>
          <button
            onClick={() => dispatch(changeRing("ring1"))}
            className="details__btns"
          >
            <img className="details__image" src={ringImg2} />
          </button>
        </li>
        <li>
          <button
            onClick={() => dispatch(changeRing("ring2"))}
            className="details__btns"
          >
            <img className="details__image" src={ringImg1} />
          </button>
        </li>
        <li>
          <button
            onClick={() => dispatch(changeRing("ring3"))}
            className="details__btns"
          >
            <img className="details__image" src={ringImg3} />
          </button>
        </li>
      </ul>
    );
  } else {
    return <div> </div>;
  }
};

export default Details;
