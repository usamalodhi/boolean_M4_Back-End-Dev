const {
    createToken,
    createTokenWithExpiry,
    verifyToken
} = require('../src/token');

const payload = {
    id: 1,
    username: "nathank",
    iat: 1643987414
};
const secret = 'mysecretkey';
const expectedTokenWithoutExpiry = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuYXRoYW5rIiwiaWF0IjoxNjQzOTg3NDE0fQ.U1bbfhp0ApmRSu5g7XdfKin7qWVNkgGS7H6dHWaH1Aw';


describe("createToken", () => {
    it('creates a JWT with no expiry time', () => {
        const result = createToken(payload, secret);

        expect(result).toEqual(expectedTokenWithoutExpiry);
    });
});

describe("createTokenWithExpiry", () => {
    it('creates an expiring JWT', () => {
        const expectedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuYXRoYW5rIiwiaWF0IjoxNjQzOTg3NDE0LCJleHAiOjE2NDM5OTEwMTR9.QCz4ZwNwkqRsFW5VPct76u7uBvdl6jzjx49uQbpT8JA';
        
        const result = createTokenWithExpiry(payload, secret, '1h');

        expect(result).toEqual(expectedToken);
    });
});

describe("verifyToken", () => {
    it('returns the decoded token if verification is successful', () => {
        const result = verifyToken(expectedTokenWithoutExpiry, secret);

        expect(result).toEqual(payload);
    });

    it('returns false if token cannot be verified', () => {
        const result = verifyToken(expectedTokenWithoutExpiry, 'thewrongsecret');

        expect(result).toBeFalse();
    });
});