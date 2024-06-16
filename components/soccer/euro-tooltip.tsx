'use client';

import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

type EuroTooltipProps = {
  title?: string;
  description?: string;
};

const EuroTooltip = ({ title, description }: EuroTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipContent>
          <TooltipTrigger asChild>
            <Button variant='default' size='lg'>
              {title}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{description}</p>
          </TooltipContent>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EuroTooltip;
