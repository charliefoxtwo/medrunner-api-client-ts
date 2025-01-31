import { Logger } from "ts-log";

import { HeaderProvider } from "../../../Func";
import ClientHistory from "../../../models/ClientHistory";
import Person from "../../../models/Person";
import ApiResponse from "../../ApiResponse";
import PaginatedResponse from "../../PaginatedResponse";
import ApiEndpoint from "../ApiEndpoint";
import TokenManager from "../auth/TokenManager";

/**
 * Endpoints for interacting with clients.
 * */
export default class ClientEndpoint extends ApiEndpoint {
  constructor(baseUrl: string, tokenManager: TokenManager, log?: Logger, headerProvider?: HeaderProvider) {
    super(baseUrl, tokenManager, log, headerProvider);
  }

  protected override endpoint(): string {
    return "client";
  }

  /**
   * Gets the current client.
   * */
  public async get(): Promise<ApiResponse<Person>> {
    return await this.getRequest<Person>("");
  }

  /**
   * Gets the specified amount of emergencies the client has created.
   * @param limit - The number of emergencies to get
   * @param paginationToken - The number to use for pagination
   * */
  public async getHistory(
    limit: number,
    paginationToken?: string,
  ): Promise<ApiResponse<PaginatedResponse<ClientHistory>>> {
    return await this.getRequest<PaginatedResponse<ClientHistory>>("/history", { limit, paginationToken });
  }

  /**
   * Links the current user to a rsiHandle.
   *
   * @param rsiHandle - The RSI handle of the client
   *
   * */
  public async linkClient(rsiHandle: string): Promise<ApiResponse> {
    return await this.postRequest("/link", { rsiHandle });
  }

  /**
   * Updates the settings of the current user for the Client Portal.
   *
   * @param settings - The object settings to add or update
   * @returns The updated settings object
   *
   * */
  public async setSettings(settings: Record<string, unknown>): Promise<ApiResponse<Record<string, unknown>>> {
    return await this.patchRequest<Record<string, unknown>>("/settings/clientPortal", settings);
  }
}
