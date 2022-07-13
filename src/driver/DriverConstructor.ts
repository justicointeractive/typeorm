import { Driver } from "./Driver";
import { DataSource } from "../data-source/DataSource";
import { BaseDataSourceOptions } from "../data-source/BaseDataSourceOptions";

export type DriverConstructor = new (connection: DataSource) => Driver<BaseDataSourceOptions>;
