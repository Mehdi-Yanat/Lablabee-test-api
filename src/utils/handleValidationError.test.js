import { describe, expect, it, vi } from "vitest";
import { expressResultValidation, handleValidationError } from "./handleValidationError"


describe('handleValidationError()', () => {
    it('should return a object with status 400', () => {

        const res = {
            status: vi.fn(() => {
                return {
                    json: vi.fn((error) => {
                        return {
                            success: false,
                            message: error.message,
                        }
                    })
                }
            }),

        }

        const response = handleValidationError(res, 'Error', 400)


        expect(res.status).toHaveBeenCalledWith(400)
        expect(response).toEqual({
            success: false,
            message: 'Error'
        })

    })
})

describe('expressResultValidation()', () => {
    it('should return a null', () => {
        const res = {
            status: vi.fn(() => {
                return {
                    json: vi.fn((error) => {
                        return {
                            success: false,
                            message: error.message,
                        }
                    })
                }
            }),

        }
        const req = {
            body: {},
        }
        const response = expressResultValidation(req, res)
        expect(response).toBeNull()
    })
})