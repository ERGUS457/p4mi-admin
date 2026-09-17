import { cn } from "@/lib/utils"

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("border rounded-lg shadow-sm bg-white", className)}>{children}</div>
)

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 border-b font-semibold">{children}</div>
)

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg">{children}</h3>
)

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("p-4", className)}>{children}</div>
)
