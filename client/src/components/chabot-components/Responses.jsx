import React, { useState } from "react";
import { addUser, changeBotStatus } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
const TakeName = (props) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(addUser({ name: name }));
      props.actionProvider.handleName();
    }
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="">
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Please enter your name"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    </div>
  );
};
const TakeAge = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [age, setAge] = useState("");
  const dispatch = useDispatch();

  const handleAgeSelect = (selectedAge) => {
    setAge(selectedAge);
    dispatch(addUser({ age: selectedAge }));
    setTimeout(() => {
      dispatch(changeBotStatus());
    }, 5000);
    props.actionProvider.handleAge();
  };

  const ageOptions = Array.from({ length: 23 }, (_, index) => 18 + index);

  return (
    <div className="">
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="user-age"
        value={age}
        onChange={(e) => handleAgeSelect(e.target.value)}
      >
        <option value="">Select your age</option>
        {ageOptions.map((optionAge) => (
          <option key={optionAge} value={optionAge}>
            {optionAge}
          </option>
        ))}
      </select>
    </div>
  );
};
const GotIt = (props) => {
  const options = [
    {
      text: "Got It !",
      handler: props.actionProvider.handleGotItButton,
      id: 1,
    },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="flex justify-center">{optionsMarkup}</div>;
};

export { GotIt, TakeName, TakeAge };
