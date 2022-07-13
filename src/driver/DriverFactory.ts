import { MissingDriverError } from "../error/MissingDriverError"
import { CockroachDriver } from "./cockroachdb/CockroachDriver"
import { MongoDriver } from "./mongodb/MongoDriver"
import { SqlServerDriver } from "./sqlserver/SqlServerDriver"
import { OracleDriver } from "./oracle/OracleDriver"
import { SqliteDriver } from "./sqlite/SqliteDriver"
import { CordovaDriver } from "./cordova/CordovaDriver"
import { ReactNativeDriver } from "./react-native/ReactNativeDriver"
import { NativescriptDriver } from "./nativescript/NativescriptDriver"
import { SqljsDriver } from "./sqljs/SqljsDriver"
import { MysqlDriver } from "./mysql/MysqlDriver"
import { PostgresDriver } from "./postgres/PostgresDriver"
import { ExpoDriver } from "./expo/ExpoDriver"
import { AuroraMysqlDriver } from "./aurora-mysql/AuroraMysqlDriver"
import { AuroraPostgresDriver } from "./aurora-postgres/AuroraPostgresDriver"
import { Driver } from "./Driver"
import { DataSource } from "../data-source/DataSource"
import { SapDriver } from "./sap/SapDriver"
import { BetterSqlite3Driver } from "./better-sqlite3/BetterSqlite3Driver"
import { CapacitorDriver } from "./capacitor/CapacitorDriver"
import { SpannerDriver } from "./spanner/SpannerDriver"
import { DatabaseType } from ".."
import { DriverConstructor } from "./DriverConstructor"
import { BaseDataSourceOptions } from "../data-source/BaseDataSourceOptions"
import { ConnectOpts } from "net"

/**
 * Helps to create drivers.
 */
export class DriverFactory {
    private static readonly drivers = ensureCompleteness({
        "mysql": MysqlDriver,
        "postgres": PostgresDriver,
        "cockroachdb": CockroachDriver,
        "sap": SapDriver,
        "mariadb": MysqlDriver,
        "sqlite": SqliteDriver,
        "better-sqlite3": BetterSqlite3Driver,
        "cordova": CordovaDriver,
        "nativescript": NativescriptDriver,
        "react-native": ReactNativeDriver,
        "sqljs": SqljsDriver,
        "oracle": OracleDriver,
        "mssql": SqlServerDriver,
        "mongodb": MongoDriver,
        "expo": ExpoDriver,
        "aurora-mysql": AuroraMysqlDriver,
        "aurora-postgres": AuroraPostgresDriver,
        "capacitor": CapacitorDriver,
        "spanner": SpannerDriver
    } as const)

    /**
     * Creates a new driver depend on a given connection's driver type.
     */
    create<TOptions extends BaseDataSourceOptions>(connection: DataSource<TOptions>): Driver<TOptions> {
        const { type } = connection.options

        const driver = typeof type === 'function' ? type : DriverFactory.drivers[type]

        if (driver) {
            return new driver(connection) as unknown as Driver<TOptions>;
        }

        throw new MissingDriverError(type as DatabaseType, Object.keys(DriverFactory.drivers))
    }
}

function ensureCompleteness<T extends Record<DatabaseType, DriverConstructor>>(value: T) {
    return value;
}