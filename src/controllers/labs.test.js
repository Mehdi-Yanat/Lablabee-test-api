import supertest from "supertest";
import { describe, expect, it, vi } from "vitest";
import appFunction from "../../index";
import Labs from "../schema/labs.schema";
import mongoose from "mongoose";
import { addLab, deleteLab, getLabs, getOneLab, updateLab } from "./labs.controllers";

// generate id
const labId = new mongoose.Types.ObjectId()

// payload
const labPayload = {
    name: "lab",
    technology: "react",
    start_date: "2023-06-13",
    end_date: "2023-06-15"
}

// lab 
const mockLab = {
    _id: labId,
    ...labPayload,
    __v: 0,
};

// create res object
const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
};



// test connection - ping mock
const pingMock = vi.fn().mockResolvedValue({ ok: true });

const database = {
    db: {
        admin: () => {
            return {
                ping: pingMock,
            }
        },
    },
};

// dependency injection
const app = appFunction(database)


describe('GET /health', () => {
    it('should return status 200 and message', async () => {

        // request /health
        const response = await supertest(app).get('/health')

        // expect 
        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe('Server is healthy.')

    })
})

describe('GET /health-database', () => {
    it('should return status 200 and message', async () => {
        const response = await supertest(app).get('/health-database');

        expect(database.db.admin().ping).toHaveBeenCalled(); // Assert that the ping function was called
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Database connection is healthy.');
    });
});

describe('GET /api/labs', () => {

    // create mock array 
    const mockLabs = [
        { _id: new mongoose.Types.ObjectId(), name: 'Lab 1', technology: 'React', start_date: new Date(), end_date: new Date(), __v: 0 },
        { _id: new mongoose.Types.ObjectId(), name: 'Lab 2', technology: 'Node.js', start_date: new Date(), end_date: new Date(), __v: 0 },
    ];

    const mockEmptyLab = []

    it('should return an array of labs with a 200 status code', async () => {

        // mock lab
        Labs.find = vi.fn().mockResolvedValue(mockLabs);

        // create res object


        // getLabs
        await getLabs({}, res);

        // expect 
        expect(Labs.find).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            labs: mockLabs,
        });

    })

    it('should return an empty array with a 200 status code', async () => {

        // mock lab
        Labs.find = vi.fn().mockResolvedValue(mockEmptyLab);

        // create res object


        // getLabs
        await getLabs({}, res);

        // expect 
        expect(Labs.find).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            labs: mockEmptyLab,
        });
    })

    it('should return a 500 status code', async () => {

        // mock lab
        Labs.find = vi.fn().mockRejectedValueOnce(new Error('Database error'));

        // create res object


        // getLabs
        await getLabs({}, res);

        // expect 
        expect(Labs.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
    })

})

describe('GET /api/labs/{id}', () => {

    it('should return a lab with 200 status code', async () => {

        const mockLab = {
            _id: labId,
            name: 'Lab 1',
            technology: 'React',
            start_date: new Date(),
            end_date: new Date(),
            __v: 0,
        }

        // mock lab
        Labs.findById = vi.fn().mockResolvedValueOnce(mockLab)

        // create res object


        // create req object
        const req = {
            params: {
                id: labId
            }
        }

        // getOneLab
        await getOneLab(req, res);

        // expect 
        expect(Labs.findById).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            lab: mockLab
        })

    })

    it('should return not found with 404 status code', async () => {

        const mockLab = null

        // mock lab
        Labs.findById = vi.fn().mockResolvedValue(mockLab)

        // create res object


        // create req object
        const req = {
            params: {
                id: labId
            }
        }

        // getOneLab
        await getOneLab(req, res);

        // expect 
        expect(Labs.findById).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Lab not found !"
        })

    })

    it('should return array with message of error if id is not mongodb id with 400 status code', async () => {

        // ladId
        const id = 123

        // send request
        const response = await supertest(app).get('/api/labs/' + id)

        // expect
        expect(response.status).toBe(400)

    })

})

describe('POST /api/labs/', () => {

    it('should return success message with a 201 status code', async () => {

        // @ts-ignore
        // mock lab method
        const mockCreate = vi.spyOn(Labs, 'create').mockResolvedValueOnce(labPayload);
        const mockFindOne = vi.spyOn(Labs, 'findOne').mockResolvedValueOnce(null);

        // create res object


        // create req object
        const req = {
            body: labPayload,
        };

        // addLab
        await addLab(req, res);

        // expect
        expect(mockFindOne).toHaveBeenCalled();
        expect(mockCreate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Lab was created successfully!'
        })


    })

    it('should return error message with a 409 status code', async () => {

        const mockLab = {
            _id: labId,
            ...labPayload,
            __v: 0,
        };

        // @ts-ignore
        // mock lab method
        const mockCreate = vi.spyOn(Labs, 'create').mockResolvedValueOnce(labPayload);
        const mockFindOne = vi.spyOn(Labs, 'findOne').mockResolvedValueOnce(mockLab);

        // create res object


        // create req object
        const req = {
            body: labPayload,
        };

        // addLab
        await addLab(req, res);


        //expect
        expect(mockFindOne).toHaveBeenCalled();
        expect(mockCreate).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(409)
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Name already exist try other one !'
        })


    })

    it('should return error array message with a 400 status code', async () => {

        // send request
        const { status, body } = await supertest(app).post('/api/labs/').send({})

        // expect
        expect(status).toBe(400)
        expect(body.success).toBe(false)

    })

    it('should return error with a 500 status code', async () => {
        // create req object
        const req = {
            body: {
                name: 'Lab Name',
                start_date: '2023-06-01',
                end_date: '2023-06-30'
            }
        };

        // create res object
        const res = {
            status: (statusCode) => {
                // Assert that the status code is 500
                expect(statusCode).toBe(500);
                return {
                    json: (response) => {
                        // Assert that the response contains success as false and an error message
                        expect(response.success).toBe(false);
                    }
                };
            }
        };

        // Call the addLab function with the mock request and response objects
        await addLab(req, res);

    }, 100000)

})

describe('PUT /api/labs/{id}', () => {

    it('should return success message with a 200 status code', async () => {

        // spy on functions
        const updateMock = vi.spyOn(Labs, 'findByIdAndUpdate').mockResolvedValueOnce(mockLab)
        const findOneMock = vi.spyOn(Labs, 'findOne').mockResolvedValueOnce(null)


        // create req object 
        const req = {
            params: {
                id: labId
            },
            body: labPayload
        }

        // updateLab 
        await updateLab(req, res)

        // expect 
        expect(updateMock).toHaveBeenCalledOnce()
        expect(findOneMock).toHaveBeenCalledOnce()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Lab was updated successfully!'
        })
    })

    it('should return error message with a 409 status code', async () => {

        const mockLab = {
            _id: new mongoose.Types.ObjectId(),
            ...labPayload,
            __v: 0,
        };

        // spy on functions
        const mockFindOne = vi.spyOn(Labs, 'findOne').mockResolvedValueOnce(mockLab)
        const mockFindById = vi.spyOn(Labs, 'findByIdAndUpdate').mockResolvedValueOnce(null)

        // create req object 
        const req = {
            params: {
                id: labId
            },
            body: labPayload
        }

        // updateLab 
        await updateLab(req, res)

        // expect 
        expect(mockFindOne).toHaveBeenCalled()
        expect(mockFindById).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(409)
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Name already exists, please try another one!'
        })
    })

    it('should return array of error  message with a 400 status code', async () => {

        // labsId
        const id = 123

        // status , body
        const { status, body } = await supertest(app).put('/api/labs/' + id).send({})

        // expect
        expect(status).toBe(400)
        expect(body.success).toBe(false)

    })

    it('should return error message with a 404 status code', async () => {

        // spy on functions
        const mockFindOne = vi.spyOn(Labs, 'findOne').mockResolvedValueOnce(null)
        const mockFindById = vi.spyOn(Labs, 'findByIdAndUpdate').mockResolvedValueOnce(null)

        // create req object 
        const req = {
            params: {
                id: labId
            },
            body: labPayload
        }

        // updateLab
        await updateLab(req, res)

        // expect 
        expect(mockFindOne).toHaveBeenCalled()
        expect(mockFindById).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Lab not found to update!'
        })


    })

})

describe('DELETE /api/labs/{id}', () => {

    it('should return a message with 200 status code', async () => {

        const mockLab = {
            _id: labId,
            name: 'Lab 1',
            technology: 'React',
            start_date: new Date(),
            end_date: new Date(),
            __v: 0,
        }

        // mock method
        Labs.findByIdAndDelete = vi.fn().mockResolvedValueOnce(mockLab)

        // create req object
        const req = {
            params: {
                id: labId
            }
        }

        // deleteLab
        await deleteLab(req, res);

        // expect
        expect(Labs.findByIdAndDelete).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Lab was deleted successfully!'
        })

    })

    it('should return not found with 404 status code', async () => {

        const mockLab = null

        // mock method
        Labs.findByIdAndDelete = vi.fn().mockResolvedValue(mockLab)

        // create req object
        const req = {
            params: {
                id: labId
            }
        }

        // deleteLab
        await deleteLab(req, res);

        // expect
        expect(Labs.findByIdAndDelete).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Lab not found to delete!"
        })

    })

    it('should return array with message of error if id is not mongodb id with 400 status code', async () => {

        // labsId
        const id = 123

        // send request
        const response = await supertest(app).delete('/api/labs/' + id)

        expect(response.status).toBe(400)

    })
})