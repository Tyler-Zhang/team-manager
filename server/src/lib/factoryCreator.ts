import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

const typeExtractor = (obj: any) => obj.type;

export function factoryCreator<T>(typeMap: Record<string, T>, defaultClass: T, typeExtrator = typeExtractor) {
  return (plainObject: any): T => {
    const type = typeExtractor(plainObject);

    const klass = typeMap[type] || defaultClass;

    return plainToClass(klass as any, plainObject) as any;
  }
}
