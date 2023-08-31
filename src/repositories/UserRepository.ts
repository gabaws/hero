import { Event } from "../entities/Events";
import { Location } from "../entities/Location";

interface UserRepository {
  add(user: User): Promise<User>;
  verifyIsUserExists(email: string): Promise<any>;
}
export { UserRepository };
