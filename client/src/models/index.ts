import { ORM } from 'redux-orm';
import { Member } from './Member';

const orm = new ORM();
orm.register(Member as any)

export { orm }
