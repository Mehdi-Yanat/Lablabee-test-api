const { checkSchema } = require("express-validator");


const validationMiddleWare = checkSchema({
    name: {
      isString: {
        errorMessage: "Please put a valid name",
      },
      isLength: {
        options: { min: 3  },
        errorMessage: "Name length must be at least greater than 3",
      },
      custom:{
        options:((value) => {
            if (Number(value)) {
                 throw new Error("Name should not be a number");
            }
            return true
        })
      }
    },
    technology: {
      isString: {
        errorMessage: "Please put a valid technology",
      },
      isLength: {
        options: { min: 3 },
        errorMessage: "Technology length must be at least greater than 3",
      },
      custom:{
        options:((value) => {
            if (Number(value)) {
                 throw new Error("Technology should not be a number");
            }            
            return true
        })
      }
    },
    start_date: {
      isISO8601: {
        errorMessage: "Start date invalid",
      },
      custom: {
        options: (value, { req }) => {
          if (value === req.body.end_date) {
            throw new Error("Start date must not be same as the end date");
          }
  
          if (new Date(req.body.end_date) < new Date(value)) {
            throw new Error("End date must not be before the start date");
          }

          return true;
        },
      },
    },
    end_date: {
      isISO8601: {
        errorMessage: "End date invalid",
      },
    },
  });


  module.exports = validationMiddleWare