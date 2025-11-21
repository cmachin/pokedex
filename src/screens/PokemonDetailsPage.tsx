import React, { ReactElement, useMemo } from 'react';
import {
  Modal,
  Spin,
  Image,
  Descriptions,
  DescriptionsProps,
  Tag,
  Flex,
  Progress,
  Button,
  Result,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemonDetails } from 'src/hooks/useGetPokemonDetails';
import { tss } from 'src/tss';
import { getTagColor } from 'src/utils/pokemon.utils';

export const PokemonDetailsPage = () => {
  const { classes } = useStyles();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useGetPokemonDetails(Number(id));

  const items: DescriptionsProps['items'] = useMemo(
    () => [
      {
        label: 'Pokédex Entry',
        key: 'id',
        children: `# ${String(data.id).padStart(3, '0')}`,
      },
      {
        label: 'Name',
        key: 'name',
        children: data.name,
      },
      {
        label: 'Types',
        key: 'types',
        children: (
          <Flex gap="small" align="center">
            {data.types?.map((type) => (
              <Tag key={type} color={getTagColor(type)}>
                {type ?? 'Unknown'}
              </Tag>
            ))}
          </Flex>
        ),
      },
      {
        label: 'Capture Rate',
        key: 'capture_rate',
        children: `${data.capture_rate} (${((data.capture_rate / 255) * 100).toFixed(2)} %)`,
      },
      {
        label: 'Weight',
        key: 'weight',
        children: `${(data.weight / 10).toFixed(2)} kg`,
      },
      {
        label: 'Height',
        key: 'height',
        children: `${(data.height / 10).toFixed(2)} m`,
      },
      {
        label: 'HP',
        key: 'hp',
        children: (
          <Flex gap="small" align="center">
            <p style={{ width: '2.5rem', margin: 0, whiteSpace: 'nowrap' }}>{data.base_stats.hp}</p>
            <Progress
              strokeColor="#78dc00"
              showInfo={false}
              percent={(data.base_stats.hp / 255) * 100}
            />
          </Flex>
        ),
      },
      {
        label: 'Attack',
        key: 'attack',
        children: (
          <Flex gap="small" align="center">
            <p style={{ width: '2.5rem', margin: 0, whiteSpace: 'nowrap' }}>
              {data.base_stats.attack}
            </p>
            <Progress
              strokeColor="#ebcb00"
              showInfo={false}
              percent={(data.base_stats.attack / 255) * 100}
            />
          </Flex>
        ),
      },
      {
        label: 'Defense',
        key: 'defense',
        children: (
          <Flex gap="small" align="center">
            <p style={{ width: '2.5rem', margin: 0, whiteSpace: 'nowrap' }}>
              {data.base_stats.defense}
            </p>
            <Progress
              strokeColor="#df6200"
              showInfo={false}
              percent={(data.base_stats.defense / 255) * 100}
            />
          </Flex>
        ),
      },
      {
        label: 'Special Attack',
        key: 'sp_atk',
        children: (
          <Flex gap="small" align="center">
            <p style={{ width: '2.5rem', margin: 0, whiteSpace: 'nowrap' }}>
              {data.base_stats.sp_atk}
            </p>
            <Progress
              strokeColor="#24e5ffff"
              showInfo={false}
              percent={(data.base_stats.sp_atk / 255) * 100}
            />
          </Flex>
        ),
      },
      {
        label: 'Special Defense',
        key: 'sp_def',
        children: (
          <Flex gap="small" align="center">
            <p style={{ width: '2.5rem', margin: 0, whiteSpace: 'nowrap' }}>
              {data.base_stats.sp_def}
            </p>
            <Progress
              strokeColor="#516be2"
              showInfo={false}
              percent={(data.base_stats.sp_def / 255) * 100}
            />
          </Flex>
        ),
      },
      {
        label: 'Speed',
        key: 'speed',
        children: (
          <Flex gap="small" align="center">
            <p style={{ width: '2.5rem', margin: 0, whiteSpace: 'nowrap' }}>
              {data.base_stats.speed}
            </p>
            <Progress
              strokeColor="#cd1baf"
              showInfo={false}
              percent={(data.base_stats.speed / 255) * 100}
            />
          </Flex>
        ),
      },
      {
        label: 'Total Base Stats',
        key: 'total',
        children: <strong>{data.base_stats.total}</strong>,
      },
    ],
    [data],
  );

  const getModalTitle = (): string => {
    if (loading) return 'Loading...';
    if (error) return 'ERROR!';
    return data.name;
  };

  const getModalContent = (): ReactElement => {
    if (loading)
      return (
        <Spin tip="Fetching Pokémon details..." size="large">
          <div />
        </Spin>
      );

    if (error)
      return (
        <Result
          status="error"
          title="Looks like something went wrong!"
          subTitle="Team Rocket might be behind it... Try refreshing the page"
          extra={
            <Button type="primary" key="reload" onClick={() => window.location.reload()}>
              Reload
            </Button>
          }
        />
      );

    return (
      <>
        <Image preview={false} src={data.sprite} alt={data.name} />
        <Descriptions bordered items={items} column={1} size="small" />
      </>
    );
  };

  return (
    <Modal
      className={classes.root}
      title={getModalTitle()}
      open
      footer={null}
      onCancel={() => navigate('/list')}
    >
      {getModalContent()}
    </Modal>
  );
};

const useStyles = tss.create(({ theme }) => ({
  root: {
    '*': {
      fontFamily: 'Consolas',
    },
    '.ant-modal-content, .ant-modal-header': {
      background: theme.color.modal.primary,
    },
    '.ant-modal-close': {
      background: theme.color.modal.accent,
      color: theme.color.modal.secondary,
      padding: '0.5rem 1rem 1.5rem 1rem',
      borderRadius: '0.5rem',
    },
    '.ant-modal-close:hover': {
      background: '#fdc3d2ff',
    },
    '.ant-modal-title': {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      padding: '0.25rem',
      background: '#6ec47e',
      width: '60%',
      border: '0.25rem solid',
      borderColor: '#144134',
      borderRadius: '0.5rem',
    },
    '.ant-modal-content': {
      minHeight: '20rem',
      border: '0.5rem solid',
      borderColor: theme.color.modal.accent,
      borderRadius: '1rem',
    },
    '.ant-spin-nested-loading': {
      paddingTop: '20rem',
      background: theme.color.modal.secondary,
      border: '1.5rem solid',
      borderColor: theme.color.modal.tertiary,
    },
    '.ant-spin-text': {
      marginTop: '1rem',
      textShadow: 'unset !important',
    },
    '.ant-alert': {
      margin: '5rem 0',
    },
    '.ant-image': {
      width: '100%',
      background: theme.color.modal.secondary,
      border: '1.5rem solid',
      borderColor: theme.color.modal.tertiary,
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem',
      marginBottom: '1rem',
      borderRadius: '8px',
    },
    '.ant-image img': {
      width: '15rem',
    },
    '.ant-descriptions-row': {
      fontWeight: 'bold',
      background: theme.color.table.primary,
      border: `${theme.color.table.border} !important`,
      borderColor: `${theme.color.table.borderColor} !important`,
    },
    '.ant-descriptions-item-label': {
      fontWeight: 'bold',
      fontSize: '1.15rem',
      border: `${theme.color.table.border} !important`,
      borderColor: `${theme.color.table.borderColor} !important`,
    },
    '.ant-descriptions-item-content': {
      fontSize: '1.15rem',
      background: theme.color.table.secondary,
    },
    '.ant-result': {
      background: theme.color.modal.secondary,
      border: '1.5rem solid',
      borderColor: theme.color.modal.tertiary,
    },
  },
}));
