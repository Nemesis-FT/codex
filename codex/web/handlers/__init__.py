import typing as t

import fastapi

from codex.web import errors
from neomodel.exceptions import UniqueProperty, DoesNotExist, MultipleNodesReturned


# noinspection PyUnusedLocal
async def handle_application_error(request: fastapi.Request, exc: errors.ApplicationException) -> fastapi.Response:
    return exc.to_response()


# noinspection PyUnusedLocal
async def handle_neomodel_not_found(request: fastapi.Request, exc: DoesNotExist) -> t.NoReturn:
    raise errors.ResourceNotFound()


# noinspection PyUnusedLocal
async def handle_neomodel_multiple_results(request: fastapi.Request, exc: MultipleNodesReturned) -> t.NoReturn:
    raise errors.MultipleResultsFound()


# noinspection PyUnusedLocal
async def handle_neomodel_not_unique(request: fastapi.Request, exc: UniqueProperty) -> t.NoReturn:
    raise errors.EntityAlreadyExists()


# noinspection PyUnusedLocal
async def handle_generic_error(request: fastapi.Request, exc: Exception) -> fastapi.Response:
    raise errors.ApplicationException()
