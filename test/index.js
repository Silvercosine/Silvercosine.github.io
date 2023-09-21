// Import libraries that we need to develop the API
const express = require("express");
const path = require("path");

// Import library used to generate unique id
const { nanoid } = require("nanoid");

// Import library for HTTP status response code.
const { StatusCodes } = require("http-status-codes");

// Import validate function from utility
const { validate } = require("./utils.js");

// Create the express object app
const app = express();

app.use(express.json());

const PORT = 5000;

app.listen(PORT, function () {
  console.log(`The server is running on PORT ${PORT}`);
});

// Array to store the list of games
const gameList = [
  {
    title: "DOTA 2",
    genre: "MOBA",
    price: 0,
    id: "cEdwxbGaUmDz6406lHvVw",
  },
  {
    title: "PUBG",
    genre: "FPS",
    price: 100,
    id: "ur--GYy2rB9iFQ9ybv_FV",
  },
  {
    title: "League of Legend",
    genre: "MOBA",
    price: 0,
    id: "9VE87xL6mOmzYYcnB6D_e",
  },
];

app.get("/", function (req, res) {
  res.status(StatusCodes.OK).sendFile(path.join(__dirname, "./index.html"));
});

app.get("/games", function (req, res) {
  res.status(StatusCodes.OK).json({
    data: gameList,
  });
});

app.get("/games/:id", function (req,res){
  const { id } = req.params;

  for(let a = 0; a < gameList.length; a++) {
    if(gameList[a]["id"] === id) {
      return res.status(StatusCodes.OK).json({
        data: gameList[a]
      })
    }
  }

  return res.status(StatusCodes.BAD_REQUEST).json({
    message: "We dont have it here"
  })
})

app.post("/games", function (req, res) {
  const rules = {
    title: function (value) {
      return typeof value === "string" && value.length > 0;
    },
    genre: function (value) {
      return typeof value === "string" && value.length > 0;
    },
    price: function (value) {
      return typeof value === "number" && value >= 0;
    },
  };

  // retrieve the data from the request body (payload)
  const gameData = req.body;

  gameData["id"] = nanoid()

  const errors = validate(gameData, rules);

  // If the game data structure is the same as the rules
  if (errors.length === 0) {
    // store / push the data to the array
    gameList.push(gameData);

    res.status(StatusCodes.CREATED).json({
      message: "Insert new game record successful",
    });
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: errors,
    });
  }
});

app.put("/games/:id", function(req,res) {
  const { id:idparams } = req.params;
  const gameData = req.body

  const rules = {
    id: function (value) {
      return typeof value === "string" && value.length > 0;
    },
    title: function (value) {
      return typeof value === "string" && value.length > 0;
    },
    genre: function (value) {
      return typeof value === "string" && value.length > 0;
    },
    price: function (value) {
      return typeof value === "number" && value >= 0;
    },
  };

  const errors = validate(gameData, rules)

  if(errors.length > 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: validationResults,
    })
  }

  const { id: idbody, title, genre, price } = gameData;

  if(idparams === idbody) {
    for(let a = 0; a < gameList.length; a++){
      if(idbody === gameList[a]['id']) {
        gameList[a]['genre'] = genre;
        gameList[a]['title'] = title;
        gameList[a]['price'] = price;
        return res.status(StatusCodes.OK).json({
          message: "Game data updated succesfully"
        })
      }
    }
  }

  res.status(StatusCodes.BAD_REQUEST).json({
    message: "Game ID not found or doesnt exist"
  })
})

app.delete("/games/:id", function(req,res) {
  const { id } = req.params;
  
  for(let a = 0; a < gameList.length; a++) {
    if(id === gameList[a]['id']) {
      gameList.splice(a, 1);
      return res.status(StatusCodes.OK).json({
        message: "Data has been removed"
      })
    }
  }
}) 