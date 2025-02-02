﻿// Copyright (c) 2022 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {Binding, Component, inject, ProviderMap} from '@loopback/core';
import {Class, Model, Repository} from '@loopback/repository';
import {Strategies} from 'loopback4-authentication';
import {ILogger, LOGGER} from '../logger-extension';

import {
  BearerVerifierBindings,
  BearerVerifierConfig,
  BearerVerifierType,
} from './keys';
import {RevokedToken} from './models';
import {FacadesBearerTokenVerifyProvider} from './providers/facades-bearer-token-verify.provider';
import {ServicesBearerTokenVerifyProvider} from './providers/services-bearer-token-verify.provider';
import {RevokedTokenRepository} from './repositories';

export class BearerVerifierComponent implements Component {
  constructor(
    @inject(BearerVerifierBindings.Config)
    private readonly config: BearerVerifierConfig,
    @inject(LOGGER.LOGGER_INJECT) public logger: ILogger,
  ) {
    this.providers = {};
    this.repositories = [RevokedTokenRepository];

    this.models = [RevokedToken];

    if (this.config && this.config.type === BearerVerifierType.service) {
      this.providers[Strategies.Passport.BEARER_TOKEN_VERIFIER.key] =
        ServicesBearerTokenVerifyProvider;
    } else if (this.config && this.config.type === BearerVerifierType.facade) {
      this.providers[Strategies.Passport.BEARER_TOKEN_VERIFIER.key] =
        FacadesBearerTokenVerifyProvider;
    } else {
      this.logger.error('Invalid BearerVerifierType specified !');
    }
  }
  providers?: ProviderMap;
  bindings: Binding[] = [];

  /**
   * An optional list of Repository classes to bind for dependency injection
   * via `app.repository()` API.
   */
  repositories?: Class<Repository<Model>>[];

  /**
   * An optional list of Model classes to bind for dependency injection
   * via `app.model()` API.
   */
  models?: Class<Model>[];
}
