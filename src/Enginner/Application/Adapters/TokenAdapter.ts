
export default abstract class TokenAdapter {
    abstract decodeToken(token: string): Promise<any>;
}