import React, { FC, useEffect, useRef, useState } from 'react';
import { Box } from 'grommet';

import PrintMessage from './PrintMessage';
import StatRollMessage from './StatRollMessage';
import HxRollMessage from './HxRollMessage';
import BarterMessage from './BarterMessage';
import BarterRollMessage from './BarterRollMessage';
import SufferHarmMessage from './SufferHarmMessage';
import AdjustHxMessage from './AdjustsHxMessage';
import StabilizeMessage from './StabilizeMessage';
import StockMessage from './StockMessage';
import SufferVHarmMessage from './SufferVHarmMessage';
import ScriptChangeMessage from './ScriptChangeMessage';
import { accentColors, HeadingWS, TextWS } from '../../config/grommetConfig';
import { MessageType } from '../../@types/enums';
import { GameMessage } from '../../@types/dataInterfaces';
import { useGame } from '../../contexts/gameContext';
import { useMoves } from '../../contexts/movesContext';

const MessagesPanel: FC = () => {
  // -------------------------- Component state ----------------------------- //
  const [ticker, setTicker] = useState(0);
  const { game, userGameRole } = useGame();

  // -------------------------- Component refs ------------------------------ //
  const messageEndRef = useRef<HTMLDivElement>(null);

  // -------------------------- Hooks --------------------------------------- //
  const { rollingMove } = useMoves();

  // -------------------------- Component functions ------------------------- //
  const scrollToBottom = () => {
    !!messageEndRef.current &&
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Limits the message rendered to the 10 most recent messages
  const limitMessages = () => {
    if (!!game && !!game.gameMessages) {
      const start =
        game.gameMessages.length < 10 ? 0 : game.gameMessages.length - 10;
      const end = game.gameMessages.length;
      return game.gameMessages.slice(start, end);
    } else {
      return [];
    }
  };

  // -------------------------- Effects ------------------------------------- //
  // Adds a ticker so that "sentOn" will update every minute
  useEffect(() => {
    const interval = window.setInterval(() => setTicker(ticker + 1), 60000);
    return () => window.clearInterval(interval);
  }, [ticker]);

  // Scrolls down to the newest message whenever a new message comes in
  useEffect(() => {
    scrollToBottom();
  }, [game?.gameMessages]);

  useEffect(() => {
    rollingMove && scrollToBottom();
  }, [rollingMove]);

  // -------------------------- Render -------------------------------------- //
  // Renders message based on messageType
  const renderMoveMessage = (
    message: GameMessage,
    index: number,
    ticker: number
  ) => {
    switch (message.messageType) {
      case MessageType.rollStatMove:
        return (
          <StatRollMessage
            messagesLength={limitMessages().length}
            index={index}
            message={message}
            ticker={ticker}
          />
        );
      case MessageType.rollHxMove:
        return (
          <HxRollMessage
            messagesLength={limitMessages().length}
            index={index}
            message={message}
            ticker={ticker}
          />
        );
      case MessageType.printMove:
        return (
          <PrintMessage
            messagesLength={limitMessages().length}
            index={index}
            message={message}
            ticker={ticker}
          />
        );
      case MessageType.barterMove:
        return (
          <BarterMessage
            messagesLength={limitMessages().length}
            index={index}
            message={message}
            ticker={ticker}
          />
        );
      case MessageType.rollBarterMove:
        return (
          <BarterRollMessage
            messagesLength={limitMessages().length}
            index={index}
            message={message}
            ticker={ticker}
          />
        );
      case MessageType.sufferHarmMove:
        return (
          <SufferHarmMessage
            messagesLength={limitMessages().length}
            index={index}
            message={message}
            ticker={ticker}
          />
        );
      case MessageType.sufferVHarmMove:
        return (
          <SufferVHarmMessage
            messagesLength={limitMessages().length}
            index={index}
            message={message}
            ticker={ticker}
          />
        );
      case MessageType.adjustHxMove:
        return (
          <AdjustHxMessage
            messagesLength={limitMessages().length}
            index={index}
            message={message}
            ticker={ticker}
          />
        );
      case MessageType.rollStockMove:
        return (
          <StabilizeMessage
            messagesLength={limitMessages().length}
            index={index}
            message={message}
            ticker={ticker}
          />
        );
      case MessageType.stockMove:
        return (
          <StockMessage
            messagesLength={limitMessages().length}
            index={index}
            message={message}
            ticker={ticker}
          />
        );
      case MessageType.sciptChange:
        return (
          <ScriptChangeMessage
            messagesLength={limitMessages().length}
            index={index}
            message={message}
          />
        );
      default:
        return;
    }
  };

  const renderRollingMessage = () => {
    return <div data-testid={`rolling-message`}>
      <Box direction="row" justify="between" align="center">
        <Box direction="row" align="center" justify="between">
          <HeadingWS level={4} margin={{ vertical: '6px' }}>
            ROLLING...
          </HeadingWS>
        </Box>
        <TextWS color="neutral-1">Now</TextWS>
      </Box>
    </div>
  }

  return (
    <Box
      data-testid="messages-panel"
      fill
      pad="12px"
      overflow="auto"
      gap="12px"
      style={{ maxWidth: '812px' }}
    >
      {limitMessages().map((message, index) => {
        const isUserSender = userGameRole?.id === message.gameRoleId;
        return (
          <Box
            key={index}
            pad="12px"
            border={{ color: isUserSender ? '#FFF' : accentColors[0] }}
            style={{ minHeight: 'min-content' }}
          >
            {renderMoveMessage(message, index, ticker)}

          </Box>
        );
      })}
      {rollingMove && <Box
        key={'rolling'}
        pad="12px"
        border={{ color: '#FFF' }}
        style={{ minHeight: 'min-content' }}
      >
        {renderRollingMessage()}

      </Box>}
      <div ref={messageEndRef} />
    </Box>
  );
};

export default MessagesPanel;
