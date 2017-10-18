import 'reflect-metadata';

import * as _              from 'underscore';
import * as Koa            from 'koa';
import * as Router         from 'koa-router';

import {
  Constructor,
  Injectable,
  defineInjectionMetadata,
  getInjectionMetadata,
}                          from './injection';

export const MIDDLEWARE                = 'MIDDLEWARE';

export const MIDDLEWARE_TARGET_APP     = 'app';
export const MIDDLEWARE_TARGET_ROUTER  = 'router';

const MIDDLEWARE_TAGS                  = [ 'middleware', 'provider' ];

/**
 * MiddlewareProvider class decorator will register the middlewares declared in
 * the provider to Koa and KoaRouter.
 */
export function MiddlewareProvider(
  options: { tags?: string[], meta?: object } = {},
) {
  return (constructor: Constructor) => {
    const injectionMetadata = getInjectionMetadata(constructor);
    const injectable = Injectable({
      inputs:  true,
      tags:    _.union(MIDDLEWARE_TAGS, options.tags || []),
      meta:    _.extend({}, options.meta, {
        middlewares: injectionMetadata.meta.middlewares || [],
      }),
    });
    injectable(constructor);
    (constructor as any).prototype.$getMiddlewares = $getMiddlewares;
  };
}

export function AppMiddleware(options: { later?: boolean } = {}) {
  return middleware(_.extend({}, options, { target: MIDDLEWARE_TARGET_APP }));
}

export function RouterMiddleware(options: { later?: boolean } = {}) {
  return middleware(
    _.extend({}, options, { target: MIDDLEWARE_TARGET_ROUTER }),
  );
}

function middleware(metadata: MiddlewareMetadata) {
  return (target: any, propertyName: string) => {
    metadata.name = propertyName;
    metadata.provider = target.constructor.name;

    const injectionMetadata = getInjectionMetadata(target.constructor);
    _.defaults(injectionMetadata.meta, { middlewares: [] });
    injectionMetadata.meta.middlewares.push(metadata);
    defineInjectionMetadata(target.constructor, injectionMetadata);
  };
}

export interface MiddlewareMetadata {
  target:    string;
  provider:  string;
  name:      string;
  later:     boolean;
}

export interface Middleware extends MiddlewareMetadata {
  fn:      Router.IMiddleware | Koa.Middleware;
}

export interface MiddlewareProvider {
  $getMiddlewares(): Middleware[];
}

function $getMiddlewares(): Middleware[] {
  const injectionMetadata = getInjectionMetadata(this.constructor);
  return _.map(
    injectionMetadata.meta.middlewares,
    (metadata: MiddlewareMetadata) => {
      return _.extend(metadata, { fn: this[metadata.name] });
    },
  );
}
