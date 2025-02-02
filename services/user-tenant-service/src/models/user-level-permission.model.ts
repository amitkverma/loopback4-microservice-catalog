﻿// Copyright (c) 2022 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {model, property, belongsTo} from '@loopback/repository';
import {UserPermission} from 'loopback4-authorization';
import {UserModifiableEntity} from '@sourceloop/core';
import {UserTenant} from './index';

@model({
  name: 'user_permissions',
  settings: {
    defaultIdSort: false,
  },
})
export class UserLevelPermission
  extends UserModifiableEntity
  implements UserPermission<string>
{
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  permission: string;

  @property({
    type: 'boolean',
    required: true,
    default: true,
  })
  allowed: boolean;

  @belongsTo(
    () => UserTenant,
    {name: 'userTenant'},
    {
      name: 'user_tenant_id',
      required: true,
    },
  )
  userTenantId: string;

  constructor(data?: Partial<UserLevelPermission>) {
    super(data);
  }
}
