import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Icon,
  Input,
  Select,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import Flag from "react-world-flags";
import { AsYouType } from "libphonenumber-js";
import { getCountryTelCode } from "./countries";

export default function PhoneNumberInput({
  size,
  value,
  country = "IND",
  options,
  onChange,
  placeholder,
  ...rest
}) {
  let [number, setNumber] = useState(value || "");
  let [selectedCountry, setSelectedCountry] = useState(country || "");
  let [countryCode, setCountryCode] = useState(
    getCountryTelCode(country) || ""
  );

  useEffect(() => {
    setSelectedCountry(country);
    setCountryCode(getCountryTelCode(country));
  }, [country]);

  const onCountryChange = e => {
    let value = e.target.value;
    let code = getCountryTelCode(value);
    let parsedNumber = new AsYouType().input(`${code}${number}`);

    setCountryCode(code);
    setSelectedCountry(value);
    onChange(parsedNumber);
  };

  const onPhoneNumberChange = e => {
    let value = e.target.value;
    let parsedNumber = new AsYouType().input(`${countryCode}${value}`);

    setNumber(value);
    onChange(parsedNumber);

  };
  return (
    <InputGroup size={size} {...rest}>
      <InputLeftElement width="4rem">
        <Flag width={"40px"} height="30px" code={selectedCountry || "india"} style={{ marginLeft: "35px" }} />
        <Select
          top="0"
          left="-4"
          zIndex={1}
          bottom={0}
          opacity={0}
          height="100%"
          position="relative"
          value={selectedCountry}
          onChange={onCountryChange}
        >
          <option value=""  />
          {options.map(option => (
            <option value={option.value}>{option.label}</option>
          ))}
        </Select>

      </InputLeftElement>
      <Input
        pl="4rem"
        type="number"
        value={number}
        pattern="[0-9]"
        placeholder={placeholder}
        onChange={onPhoneNumberChange}
        focusBorderColor="teal.500"
        border="1px"
        borderColor={"gray.400"}


      />
    </InputGroup>
  );
}

PhoneNumberInput.defaultProps = {
  options: [],
  size: "md"
};
