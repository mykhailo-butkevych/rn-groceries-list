import {
  Button,
  ButtonText,
  Input,
  InputField,
  Text,
  View,
} from '@gluestack-ui/themed';
import {useSelectedGroceryStore} from 'hooks/zustand/use-selected-grocery';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAvoidingView, Modal, Platform, ScrollView} from 'react-native';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {useUpdateGrocery} from 'api/hooks/use-update-grocery';
import {useAddGrocery} from 'api/hooks/use-add-grocery';
import uuid from 'react-native-uuid';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const grocerySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .transform(val => Number(val))
    .refine(val => !isNaN(val), {
      message: 'Amount must be a valid number',
    })
    .refine(val => val > 0, {
      message: 'Amount must be greater than 0',
    }),
});

type GroceryFormData = z.infer<typeof grocerySchema>;

export const GroceryModal = () => {
  const [selectedGrocery, actionType, setSelectedGrocery] =
    useSelectedGroceryStore(state => [
      state.selectedGrocery,
      state.actionType,
      state.setSelectedGrocery,
    ]);
  const {mutate: updateGrocery} = useUpdateGrocery();
  const {mutate: addGrocery} = useAddGrocery();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isDirty},
    reset,
  } = useForm<GroceryFormData>({
    resolver: zodResolver(grocerySchema),
    mode: 'onChange',
  });

  useEffect(() => {
    reset({
      name: selectedGrocery?.name || '',
      amount: (selectedGrocery?.amount.toString() || '') as any,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionType]);

  const onClose = () => {
    setSelectedGrocery(null);
  };

  const onSubmit = (data: GroceryFormData) => {
    if (actionType === 'edit' && selectedGrocery) {
      updateGrocery({
        name: data.name,
        amount: Number(data.amount),
        id: selectedGrocery.id,
        isBought: selectedGrocery.isBought,
      });
    } else {
      const id = String(uuid.v4());
      addGrocery({
        id,
        name: data.name,
        amount: Number(data.amount),
        isBought: false,
      });
    }

    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={!!actionType}
      onRequestClose={onClose}>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              flexGrow: 1,
              flexShrink: 1,
              backgroundColor: 'hotpink',
            }}>
            <View
              flex={1}
              justifyContent="center"
              alignItems="center"
              backgroundColor="rgba(0, 0, 0, 0.5)"
              padding={20}
              height="100%">
              <View>
                <View
                  width="100%"
                  padding={20}
                  backgroundColor="$white"
                  borderRadius={4}
                  gap={'$4'}
                  height="100%">
                  {selectedGrocery?.id && (
                    <Text color="$black" fontSize={16} bold>
                      ID: {selectedGrocery.id}
                    </Text>
                  )}
                  <ScrollView>
                    <View style={{gap: 10}}>
                      <View gap="$1">
                        <Text color="$black" fontSize={16} bold>
                          Name:
                        </Text>
                        <Controller
                          name="name"
                          control={control}
                          rules={{required: 'Name is required'}}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input variant="outline" size="md">
                              <InputField
                                placeholder="Enter Grocery Name"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                              />
                            </Input>
                          )}
                        />
                        {errors.name && (
                          <Text color="$red" fontSize={12} marginTop="$1">
                            {errors.name.message as string}
                          </Text>
                        )}
                      </View>
                      <View gap="$1">
                        <Text color="$black" fontSize={16} bold>
                          Amount:
                        </Text>
                        <Controller
                          name="amount"
                          control={control}
                          rules={{required: 'Amount is required'}}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input variant="outline" size="md">
                              <InputField
                                placeholder="Enter Amount"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={String(value)}
                              />
                            </Input>
                          )}
                        />
                        {errors.amount && (
                          <Text color="$red" fontSize={12} marginTop="$1">
                            {errors.amount.message as string}
                          </Text>
                        )}
                      </View>
                    </View>
                  </ScrollView>
                  <View
                    marginTop="$6"
                    flexDirection="row"
                    justifyContent="space-between">
                    <Button
                      w="45%"
                      size="md"
                      variant="solid"
                      action="secondary"
                      onPress={onClose}>
                      <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button
                      w="45%"
                      size="md"
                      variant="solid"
                      action={actionType === 'edit' ? 'primary' : 'positive'}
                      isDisabled={!isValid || !isDirty}
                      onPress={handleSubmit(onSubmit)}>
                      <ButtonText>
                        {actionType === 'edit' ? 'Update' : 'Add'}
                      </ButtonText>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};
