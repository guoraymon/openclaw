import type { RuntimeEnv } from "../runtime.js";
import type { OnboardOptions } from "./onboard-types.js";
import { defaultRuntime } from "../runtime.js";
import { restoreTerminalState } from "../terminal/restore.js";
import { createClackPrompter } from "../wizard/clack-prompter.js";
import { runOnboardingWizard } from "../wizard/onboarding.js";
import { WizardCancelledError } from "../wizard/prompts.js";

export async function runInteractiveOnboarding(
  opts: OnboardOptions,
  runtime: RuntimeEnv = defaultRuntime,
) {
  // LEARNED: 创建交互式提示器
  const prompter = createClackPrompter();
  try {
    await runOnboardingWizard(opts, runtime, prompter);
  } catch (err) {
    // LEARNED: 用户取消操作，正常退出
    if (err instanceof WizardCancelledError) {
      runtime.exit(0);
      return;
    }
    throw err;
  } finally {
    // LEARNED: 恢复终端状态
    restoreTerminalState("onboarding finish");
  }
}
