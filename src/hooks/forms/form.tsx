import { lazy } from "react";

import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./context";
import { SubscribeButton } from "./fieldComponents";

const TextField = lazy(() =>
  import("./fieldComponents").then((m) => ({ default: m.TextField })),
);

const SauceField = lazy(() =>
  import("./fieldComponents").then((m) => ({ default: m.SauceField })),
);

const ToppingField = lazy(() =>
  import("./fieldComponents").then((m) => ({ default: m.ToppingField })),
);

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    SauceField,
    ToppingField,
  },
  formComponents: {
    SubscribeButton,
  },
});
