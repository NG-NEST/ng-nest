import { Observable, BehaviorSubject } from "rxjs";

// 数据类型
export type XData<T> = T | BehaviorSubject<T> | Observable<T>;
