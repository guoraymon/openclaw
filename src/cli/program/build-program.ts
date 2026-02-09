import { Command } from "commander";
import { registerProgramCommands } from "./command-registry.js";
import { createProgramContext } from "./context.js";
import { configureProgramHelp } from "./help.js";
import { registerPreActionHooks } from "./preaction.js";

export function buildProgram() {
  const program = new Command();
  // STUDY: 创建程序上下文
  const ctx = createProgramContext();
  const argv = process.argv;

  // STUDY: 配置程序帮助信息
  configureProgramHelp(program, ctx);
  registerPreActionHooks(program, ctx.programVersion);

  // LEARNED: 注册程序命令
  registerProgramCommands(program, ctx, argv);

  return program;
}
