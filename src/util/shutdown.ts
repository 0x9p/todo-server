export type ShutdownListener = () => Promise<void>;

/**
 * ShutdownCoordinator is a class used for managing a graceful shutdown of a service.
 */
export class ShutdownCoordinator {
  private registeredListeners: ShutdownListener[] = [];

  public static build(): ShutdownCoordinator {
    return new ShutdownCoordinator();
  }

  private constructor() {
    this.shutdown = this.shutdown.bind(this);
  }

  /**
   * listenShutdownSignals instructs the shutdown coordinator to listen for various shutdown signals like
   * SIGTERM and SIGINT.
   * @param signals
   */
  public listenShutdownSignals(...signals: NodeJS.Signals[]): void {
    signals.forEach((signal) => process.on(signal, this.shutdown));
  }

  /**
   * shutdown triggers the shutdown routine by calling all registered listeners.
   */
  public async shutdown(): Promise<void> {
    for (const listener of this.registeredListeners) {
      await listener();
    }
    process.exit(0);
  }

  /**
   * register adds listeners in the order that they are provided to the class' shutdown routine.
   * @param listeners
   */
  public register(...listeners: ShutdownListener[]): void {
    this.registeredListeners.push(...listeners);
  }

  /**
   * series returns a function that calls each provided listener in a sequential series fashion.
   * @param listeners
   */
  public static series(...listeners: ShutdownListener[]): ShutdownListener {
    return async () => {
      for (const listener of listeners) {
        await listener();
      }
    };
  }

  /**
   * parallel returns a function that calls each provided listener in a parallel fashion.
   * @param listeners
   */
  public static parallel(...listeners: ShutdownListener[]): ShutdownListener {
    return async (): Promise<void> => {
      await Promise.all(listeners.map((listener) => listener()));
    };
  }
}
