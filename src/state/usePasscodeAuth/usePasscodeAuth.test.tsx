import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import usePasscodeAuth, { getPasscode, verifyPasscode } from './usePasscodeAuth';

delete window.location;
// @ts-ignore
window.location = {
  search: '',
};

const customHistory = { ...createBrowserHistory(), replace: jest.fn() };

const wrapper = (props: React.PropsWithChildren<unknown>) => (
  <Router history={customHistory as any}>{props.children}</Router>
);

describe('the getPasscode function', () => {
  beforeEach(() => window.sessionStorage.clear());

  it('should return the passcode from session storage', () => {
    window.location.search = '';
    window.sessionStorage.setItem('passcode', '123123');
    expect(getPasscode()).toBe('123123');
  });

  it('should return the passcode from the URL', () => {
    window.location.search = '?passcode=234234';

    expect(getPasscode()).toBe('234234');
  });

  it('should return the passcode from the URL when the app code is also sotred in sessionstorage', () => {
    window.sessionStorage.setItem('passcode', '123123');
    window.location.search = '?passcode=234234';

    expect(getPasscode()).toBe('234234');
  });

  it('should return null when there is no passcode', () => {
    window.location.search = '';
    expect(getPasscode()).toBe(null);
  });
});

describe('the verifyPasscode function', () => {
  it('should return the correct response when the passcode is valid', async () => {
    // @ts-ignore
    window.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ token: 'mockVideoToken' }) })
    );

    const result = await verifyPasscode('123456');
    expect(result).toEqual({ isValid: true });
  });

  it('should return the correct response when the passcode is invalid', async () => {
    // @ts-ignore
    window.fetch = jest.fn(() =>
      Promise.resolve({ status: 401, json: () => Promise.resolve({ error: { message: 'errorMessage' } }) })
    );

    const result = await verifyPasscode('123456');
    expect(result).toEqual({ isValid: false, error: 'errorMessage' });
  });

  it('should call the API with the correct parameters', async () => {
    await verifyPasscode('123456');
    expect(window.fetch).toHaveBeenLastCalledWith('/token', {
      body: '{"user_identity":"temp-name","room_name":"temp-room","passcode":"123456","create_room":false}',
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    });
  });
});
