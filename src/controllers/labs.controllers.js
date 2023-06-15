const Labs = require('../schema/labs.schema');
const handleError = require('../utils/handleValidationError');


exports.addLab = async (req, res) => {
  try {

    // handle validtion error
    const response = handleError.expressResultValidation(req, res)

    if (response) return

    // destruct object
    const { name, start_date, end_date } = req.body

    // check if name already exist in the db

    const isNameAlreadyExist = await Labs.findOne({
      name
    })

    if (isNameAlreadyExist) {
      return handleError.handleValidationError(res, 'Name already exist try other one !', 409)
    }


    // create lab
    const create = await Labs.create({
      ...req.body,
      start_date: new Date(start_date),
      end_date: new Date(end_date)
    })

    // handle error if something went wrong
    if (!create) throw new Error('Something went wrong!')


    // return successfull message
    return res.status(201).json({
      success: true,
      message: 'Lab was created successfully!'
    })

  } catch (error) {
    // catch any error and send it to client
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

}

exports.updateLab = async (req, res) => {
  try {

    // handle validtion error
    const response = handleError.expressResultValidation(req, res)

    if (response) return

    // update id params
    const { id } = req.params

    // destruct object
    const { name, start_date, end_date, technology } = req.body

    // check if name already exist in the db

    const isNameAlreadyExist = await Labs.findOne({
      name
    })


    // checking if he is the owner of the name by using id
    if (isNameAlreadyExist && isNameAlreadyExist?.id.toString() !== id)
      return handleError.handleValidationError(res, 'Name already exist try other one !', 409)


    const lab = await Labs.findByIdAndUpdate(id, {
      name: isNameAlreadyExist ? isNameAlreadyExist.name : name,
      technology,
      start_date: new Date(start_date),
      end_date: new Date(end_date)
    })

    // handle error if something went wrong
    if (!lab) return handleError.handleValidationError(res, 'Lab not found to update!', 404)



    // return successfull message
    return res.status(200).json({
      success: true,
      message: 'Lab was updated successfully!'
    })

  } catch (error) {
    // catch any error and send it to client
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.getOneLab = async (req, res) => {
  try {

    // handle validtion error
    const response = handleError.expressResultValidation(req, res)

    if (response) return

    // get id params
    const { id } = req.params

    // find one by id
    const lab = await Labs.findById(id)

    // handle error if something went wrong
    if (!lab) return handleError.handleValidationError(res, 'Lab not found !', 404)


    // return successfull message
    return res.status(200).json({
      success: true,
      lab
    })

  } catch (error) {
    // catch any error and send it to client
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getLabs = async (req, res) => {
  try {

    // get labs from db
    const labs = await Labs.find()

    // return array of labs to client
    return res.status(200).json({
      success: true,
      labs
    });

  } catch (error) {
    // catch any error and send it to client
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteLab = async (req, res) => {
  try {

    // handle validtion error
    const response = handleError.expressResultValidation(req, res)

    if (response) return

    // get id params
    const { id } = req.params

    // find one by id and delete
    const lab = await Labs.findByIdAndDelete(id)

    // handle error if something went wrong
    if (!lab) return handleError.handleValidationError(res, 'Lab not found to delete!', 404)


    // return successfull message
    return res.status(200).json({
      success: true,
      message: 'Lab was deleted successfully!'
    })

  } catch (error) {
    // catch any error and send it to client
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}