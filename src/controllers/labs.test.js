/*
import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import app from "../../index"


describe('GET /labs', () => {

    const mockLabs = [
        { name: 'Lab 1', technology: 'React', start_date: new Date(), end_date: new Date() },
        { name: 'Lab 2', technology: 'Node.js', start_date: new Date(), end_date: new Date() },
    ];

    it('should return all labs and a success message if successful', async () => {

        const response = await request(app).get('/api/labs');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            labs: mockLabs,
        });
    });

});
*/