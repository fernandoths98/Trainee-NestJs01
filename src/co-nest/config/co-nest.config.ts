import { registerAs } from "@nestjs/config";

export default registerAs('nestjs', () => ({
  foo: 'bar',
}))