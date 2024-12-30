// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Autocomplete, TextField } from "@mui/material";
// import { debounce } from "lodash";

// const Address = () => {
//   const [inputValue, setInputValue] = useState<string>("");
//   const [options, setOptions] = useState<string[]>([]); // State to store the options from API

//   // API Call function
//   const apiData = (query: string) => {
//     const config = {
//       method: "get",
//       url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=94a5631c98e84c2fb7233fcbe791569e`,
//       headers: {},
//     };

//     axios(config)
//       .then(function (response) {
//         const results = response.data.features.map(
//           (item: any) => item.properties.formatted
//         );
//         setOptions(results); // Update options based on API response
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   // Debounced API call to prevent multiple requests on each keystroke
//   const debouncedApiCall = debounce((query: string) => {
//     if (query.trim() !== "") {
//       apiData(query);
//     } else {
//       setOptions([]); // Clear options if input is empty
//     }
//   }, 500); // 500ms debounce time

//   // Handle change in Autocomplete input value
//   const handleInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     newValue: string
//   ) => {
//     setInputValue(newValue); // Update input value state
//     debouncedApiCall(newValue); // Call the debounced function
//   };

//   return (
//     <div>
//       <Autocomplete
//         disablePortal
//         options={options} // Provide API results as options
//         onInputChange={handleInputChange} // Trigger when input value changes
//         value={inputValue} // Control the value
//         renderInput={(params) => (
//           <TextField {...params} label="Enter address" />
//         )}
//       />
//     </div>
//   );
// };

// export default Address;

// import React, { useState } from "react";
// import axios from "axios";
// import { Autocomplete, TextField } from "@mui/material";
// import { debounce } from "lodash";

// const Address = () => {
//   const [inputValue, setInputValue] = useState<string>("");
//   const [options, setOptions] = useState<string[]>([]); // State to store the options from API
//   const [loading, setLoading] = useState<boolean>(false); // Loading state

//   // API Call function
//   const apiData = (query: string) => {
//     if (!query.trim()) {
//       setOptions([]); // Clear options if input is empty
//       return;
//     }

//     setLoading(true); // Set loading state to true while waiting for API response
//     const config = {
//       method: "get",
//       url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=94a5631c98e84c2fb7233fcbe791569e`,
//       headers: {},
//     };

//     axios(config)
//       .then(function (response) {
//         const results = response.data.features.map(
//           (item: any) => item.properties.formatted
//         );
//         setOptions(results); // Update options based on API response
//       })
//       .catch(function (error) {
//         console.log(error);
//       })
//       .finally(() => {
//         setLoading(false); // Set loading to false once API call is finished
//       });
//   };

//   // Debounced API call to prevent multiple requests on each keystroke
//   const debouncedApiCall = debounce((query: string) => {
//     apiData(query);
//   }, 500); // 500ms debounce time

//   // Handle change in Autocomplete input value
//   const handleInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     newValue: string
//   ) => {
//     setInputValue(newValue); // Update input value state
//     debouncedApiCall(newValue); // Call the debounced function
//   };

//   // Handle option selection
//   const handleOptionChange = (
//     event: React.ChangeEvent<{}>,
//     newValue: string | null
//   ) => {
//     setInputValue(newValue || ""); // Update input value on option select
//   };

//   return (
//     <div>
//       <Autocomplete
//         disablePortal
//         options={options} // Provide API results as options
//         onInputChange={handleInputChange} // Trigger when input value changes
//         value={inputValue} // Control the value
//         onChange={handleOptionChange} // Trigger when a user selects an option
//         loading={loading} // Show loading spinner while waiting for API response
//         renderInput={(params) => (
//           <TextField {...params} label="Enter address" />
//         )}
//       />
//     </div>
//   );
// };

// export default Address;
import React, { useState, useCallback } from "react";
import axios from "axios";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

interface GeoapifyFeature {
  properties: {
    formatted: string;
  };
}

interface GeoapifyResponse {
  features: GeoapifyFeature[];
}

const Address = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const apiData = (query: string) => {
    if (!query.trim()) {
      setOptions([]);
      return;
    }

    setLoading(true);
    const config = {
      method: "get",
      url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=94a5631c98e84c2fb7233fcbe791569e`,
    };

    axios<GeoapifyResponse>(config)
      .then((response) => {
        const results = response.data.features.map(
          (item) => item.properties.formatted
        );
        setOptions(results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const debouncedApiCall = useCallback(
    (query: string) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeoutId = setTimeout(() => {
        apiData(query);
      }, 500);

      setDebounceTimeout(timeoutId);
    },
    [debounceTimeout]
  );

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    const inputTarget = event.target as HTMLInputElement;
    console.log(inputTarget.value);
    setInputValue(newValue);
    debouncedApiCall(newValue);
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        freeSolo
        options={options}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter address"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default Address;
