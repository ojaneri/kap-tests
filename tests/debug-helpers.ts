export const isDebug = !!process.env.PWDEBUG;

export async function debugSleep(ms: number = 800): Promise<void> {
  if (!isDebug) return;
  await new Promise(resolve => setTimeout(resolve, ms));
}

export async function waitForEnter(): Promise<void> {
  if (!isDebug) return;
  await new Promise(resolve => setTimeout(resolve, 1500));
}
